from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
import re
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User

# Security configuration
SECRET_KEY = "your-secret-key-change-this-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

# Rate limiting for login attempts
login_attempts = {}

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    # Truncate password to 72 bytes as bcrypt limit
    if len(password.encode('utf-8')) > 72:
        password = password.encode('utf-8')[:72].decode('utf-8', errors='ignore')
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password strength according to OWASP guidelines.
    Returns (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "Şifre en az 8 karakter olmalı"
    
    if not re.search(r'[A-Z]', password):
        return False, "Şifre en az 1 büyük harf içermeli (A-Z)"
    
    if not re.search(r'[a-z]', password):
        return False, "Şifre en az 1 küçük harf içermeli (a-z)"
    
    if not re.search(r'[0-9]', password):
        return False, "Şifre en az 1 rakam içermeli (0-9)"
    
    if not re.search(r'[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]', password):
        return False, "Şifre en az 1 özel karakter içermeli (!@#$%^&*()_+-=[]{}|;:,.<>?)"
    
    return True, ""

def check_rate_limit(email: str) -> tuple[bool, str]:
    """
    Simple rate limiting for login attempts.
    Returns (is_allowed, error_message)
    """
    current_time = datetime.utcnow()
    
    if email not in login_attempts:
        login_attempts[email] = {"count": 0, "last_attempt": current_time}
    
    # Reset if 15 minutes have passed
    if (current_time - login_attempts[email]["last_attempt"]).total_seconds() > 900:
        login_attempts[email] = {"count": 0, "last_attempt": current_time}
    
    # Check if too many attempts
    if login_attempts[email]["count"] >= 5:
        return False, "Çok fazla başarısız giriş denemesi. 15 dakika bekleyin."
    
    return True, ""

def record_login_attempt(email: str, success: bool):
    """
    Record login attempt for rate limiting.
    """
    current_time = datetime.utcnow()
    
    if email not in login_attempts:
        login_attempts[email] = {"count": 0, "last_attempt": current_time}
    
    if success:
        login_attempts[email] = {"count": 0, "last_attempt": current_time}
    else:
        login_attempts[email]["count"] += 1
        login_attempts[email]["last_attempt"] = current_time

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user
