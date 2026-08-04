# Production Database Reset Instructions

## One-Time Database Reset for Render

### Local Database (Already Done)
✅ Local database has been reset using the one-time script
✅ Database is clean with updated schema
✅ Script has been deleted

### Production Database (Render - Manual Action Required)

The production database on Render still needs to be reset. Follow these steps:

#### Option 1: Render Console (Recommended)

1. Go to your Render dashboard
2. Navigate to your Melovia Backend service
3. Click on "Shell" or "Console"
4. Run the following commands:

```bash
cd /opt/render/project/src/backend
python -c "
from sqlalchemy import create_engine, text
from app.database import SQLALCHEMY_DATABASE_URL, Base
from app.models import User

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
print('Database reset completed')
"
```

#### Option 2: SSH into Render

1. Get SSH access from Render dashboard
2. SSH into the service
3. Navigate to the backend directory
4. Run the Python code above

#### Option 3: Add Temporary Reset Endpoint (Not Recommended)

**DO NOT** add a permanent reset endpoint to your code. Instead, temporarily add a reset endpoint, run it once, then remove it immediately.

### Verification

After resetting the production database:

1. Test registration: Create a new user
2. Test login: Login with the new user
3. Test password reset: Use the forgot password feature
4. Remove any temporary code added

### Important Notes

- ⚠️ This will delete ALL user data from production
- ⚠️ Users will need to re-register
- ⚠️ Do this during low-traffic hours
- ⚠️ Notify users in advance if possible
- ✅ Future deployments will preserve data
- ✅ No permanent reset code in main.py

### Schema After Reset

The users table will have the following columns:
- id
- email (unique)
- username (unique)
- full_name
- hashed_password
- is_active
- is_email_verified
- phone
- is_phone_verified
- birth_date
- xp
- completed_lessons
- reset_token (for password reset)
- reset_token_expiry (for password reset)
- created_at
- updated_at
