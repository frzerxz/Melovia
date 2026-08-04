from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users
from app.database import init_db
import os

# Create database tables
init_db()

app = FastAPI(title="Melovia Backend API")

# CORS configuration - Allow both development and production domains
allowed_origins = [
    "http://localhost:8080",
    "http://127.0.0.1:8080", 
    "http://localhost:3000",
    "file://",
]

# Add production domains from environment variable
if os.getenv("ALLOWED_ORIGINS"):
    allowed_origins.extend(os.getenv("ALLOWED_ORIGINS").split(","))

# Add Vercel/Melovia production domain
allowed_origins.extend([
    "https://melovia.vercel.app",
    "https://frzerxz.github.io",
    "https://*.vercel.app",
    "https://melovia.com.tr",
    "https://api.melovia.com.tr",
    "https://www.melovia.com.tr"
])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])

@app.get("/")
async def root():
    return {"message": "Melovia Backend API", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}
