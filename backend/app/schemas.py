from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, date
from typing import Optional
from app.auth_utils import validate_password_strength

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        is_valid, error_msg = validate_password_strength(v)
        if not is_valid:
            raise ValueError(error_msg)
        return v

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    birth_date: Optional[date] = None
    xp: Optional[int] = None
    completed_lessons: Optional[int] = None

class PasswordChange(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

    @field_validator('new_password')
    @classmethod
    def validate_new_password(cls, v: str) -> str:
        is_valid, error_msg = validate_password_strength(v)
        if not is_valid:
            raise ValueError(error_msg)
        return v

    @field_validator('confirm_password')
    @classmethod
    def passwords_match(cls, v: str, info) -> str:
        if 'new_password' in info.data and v != info.data['new_password']:
            raise ValueError('Yeni şifreler eşleşmiyor')
        return v

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_email_verified: bool
    phone: Optional[str] = None
    is_phone_verified: bool
    birth_date: Optional[date] = None
    xp: int
    completed_lessons: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
