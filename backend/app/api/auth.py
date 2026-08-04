from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta, datetime
from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserResponse, Token, ForgotPasswordRequest, ResetPasswordRequest
from app.auth_utils import (
    get_password_hash,
    verify_password,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    check_rate_limit,
    record_login_attempt
)
from pydantic import BaseModel
import secrets
import string

router = APIRouter()

def generate_reset_token():
    """Generate a secure 6-digit OTP"""
    return ''.join(secrets.choice(string.digits) for _ in range(6))

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Check if phone number already exists (if provided)
    if user.phone:
        db_user = db.query(User).filter(User.phone == user.phone).first()
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Phone number already registered"
            )
    
    # Create new user
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        full_name=user.full_name,
        phone=user.phone,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Rate limiting check
    is_allowed, error_msg = check_rate_limit(form_data.username)
    if not is_allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=error_msg
        )
    
    # Find user by email, phone, or username
    user = db.query(User).filter(
        (User.email == form_data.username) | 
        (User.phone == form_data.username) | 
        (User.username == form_data.username)
    ).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        record_login_attempt(form_data.username, success=False)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-posta veya şifre hatalı",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Record successful login
    record_login_attempt(form_data.username, success=True)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/debug/users")
async def debug_list_users(db: Session = Depends(get_db)):
    """Debug endpoint to list all users (remove in production)"""
    users = db.query(User).all()
    return {
        "total": len(users),
        "users": [
            {
                "username": user.username,
                "email": user.email,
                "phone": user.phone,
                "created_at": user.created_at.isoformat() if user.created_at else None,
                "has_password": bool(user.hashed_password)
            }
            for user in users
        ]
    }

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """Send password reset token to user's email or phone"""
    # Find user by email, phone, or username
    user = db.query(User).filter(
        (User.email == request.identifier) | 
        (User.phone == request.identifier) | 
        (User.username == request.identifier)
    ).first()
    
    if not user:
        # For security, don't reveal if user exists
        return {"message": "Eğer bu kullanıcı kayıtlıysa, sıfırlama kodu gönderildi"}
    
    # Generate reset token
    reset_token = generate_reset_token()
    reset_token_expiry = datetime.utcnow() + timedelta(minutes=15)
    
    # Update user with reset token
    user.reset_token = reset_token
    user.reset_token_expiry = reset_token_expiry
    db.commit()
    
    # In production, send email/SMS here
    # For now, return the token (remove in production)
    return {
        "message": "Sıfırlama kodu gönderildi",
        "token": reset_token,  # Remove this in production
        "expires_in_minutes": 15
    }

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """Reset password using reset token"""
    # Find user by reset token
    user = db.query(User).filter(User.reset_token == request.token).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Geçersiz sıfırlama kodu"
        )
    
    # Check if token is expired
    if user.reset_token_expiry and user.reset_token_expiry < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Sıfırlama kodunun süresi doldu"
        )
    
    # Update password
    hashed_password = get_password_hash(request.new_password)
    user.hashed_password = hashed_password
    user.reset_token = None
    user.reset_token_expiry = None
    db.commit()
    
    return {"message": "Şifre başarıyla sıfırlandı"}
