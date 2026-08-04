from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import UserResponse, UserUpdate, PasswordChange
from app.auth_utils import get_current_user, get_password_hash, verify_password

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_current_user_profile(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if user_update.username is not None:
        # Check if username is already taken
        existing_user = db.query(User).filter(User.username == user_update.username).first()
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken"
            )
        current_user.username = user_update.username
    
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    
    if user_update.phone is not None:
        current_user.phone = user_update.phone
    
    if user_update.birth_date is not None:
        current_user.birth_date = user_update.birth_date
    
    if user_update.xp is not None:
        current_user.xp = user_update.xp
    
    if user_update.completed_lessons is not None:
        current_user.completed_lessons = user_update.completed_lessons
    
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/change-password")
async def change_password(
    password_change: PasswordChange,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Verify current password
    if not verify_password(password_change.current_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mevcut şifreniz hatalı"
        )
    
    # Check if new password is same as old password
    if verify_password(password_change.new_password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Yeni şifre eski şifre ile aynı olamaz"
        )
    
    # Update password
    current_user.hashed_password = get_password_hash(password_change.new_password)
    db.commit()
    db.refresh(current_user)
    
    return {"message": "Şifre başarıyla değiştirildi"}

@router.post("/verify-email")
async def verify_email(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simulate email verification
    current_user.is_email_verified = True
    db.commit()
    db.refresh(current_user)
    return {"message": "Email verified successfully", "is_email_verified": True}

@router.post("/verify-phone")
async def verify_phone(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Simulate phone verification
    current_user.is_phone_verified = True
    db.commit()
    db.refresh(current_user)
    return {"message": "Phone verified successfully", "is_phone_verified": True}

@router.delete("/me")
async def delete_current_user_account(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Delete user account
    db.delete(current_user)
    db.commit()
    return {"message": "Account deleted successfully"}
