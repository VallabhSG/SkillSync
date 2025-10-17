# Registration Failure Troubleshooting Guide

## Quick Diagnosis Steps

### Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to **Console** tab
3. Try registering again
4. Look for error messages

**Common Errors:**

**Error: "Network Error" or "Failed to fetch"**
- Backend is not running or not accessible
- CORS issue
- Wrong API URL

**Error: 500 Internal Server Error**
- Backend crashed or database error
- Check Railway logs

**Error: 400 Bad Request**
- Validation error
- Missing required fields

---

### Step 2: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Try registering again
4. Click on the `/api/auth/register` request

**What to look for:**
- Status Code (should be 200 for success)
- Response body (contains error message)
- Request payload (verify data is being sent)

**Copy the Response:**
- Right-click on request → Copy → Copy Response
- Share this to see the exact error

---

### Step 3: Check Railway Deployment Status

1. Go to Railway: https://railway.app/
2. Open your SkillSync project
3. Click on backend service
4. Go to **Deployments** tab

**Verify:**
- ✅ Latest deployment shows "Active" (green)
- ✅ No "Failed" or "Crashed" status
- ✅ Deployment from latest commit (89c9e41)

---

### Step 4: Check Railway Logs

1. In Railway backend service
2. Click on **View Logs** or the latest deployment
3. Look for errors

**Common Error Patterns:**

**Error: "PSQLException: column does not exist"**
```
ERROR: column "email_verified" of relation "users" does not exist
```
**Solution:** Database schema not updated. Need to update manually or recreate database.

**Error: "MailSendException" or "AuthenticationFailedException"**
```
Failed to send verification email: Authentication failed
```
**Solution:** Email credentials not configured. Can be ignored for now - registration should still work.

**Error: "Table 'verification_tokens' doesn't exist"**
```
Table "verification_tokens" doesn't exist
```
**Solution:** New table not created. Hibernate should auto-create it.

---

## Common Issues & Solutions

### Issue 1: Database Schema Outdated

**Symptoms:**
- 500 error when registering
- Logs show: "column email_verified does not exist"

**Solution A: Let Hibernate Update (Automatic)**

The production config has `spring.jpa.hibernate.ddl-auto=update`, so it should auto-update.

**Verify it's working:**
1. Check Railway logs for:
   ```
   Hibernate: alter table users add column email_verified boolean
   Hibernate: create table verification_tokens (...)
   ```

**Solution B: Manual Database Update**

If auto-update doesn't work, manually run SQL:

1. Go to Railway → Your PostgreSQL database
2. Click on "Data" tab or use connection URL
3. Run this SQL:

```sql
-- Add new columns to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_provider VARCHAR(20) DEFAULT 'LOCAL';
ALTER TABLE users ADD COLUMN IF NOT EXISTS provider_id VARCHAR(255);

-- Create verification_tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    expiry_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    used BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_verification_tokens_user 
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_verification_tokens_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_tokens_user_id ON verification_tokens(user_id);

-- Update existing users to have email_verified = false
UPDATE users SET email_verified = FALSE WHERE email_verified IS NULL;
UPDATE users SET auth_provider = 'LOCAL' WHERE auth_provider IS NULL;
```

**Solution C: Reset Database (Nuclear Option)**

⚠️ **WARNING: This deletes all data!**

1. Railway → PostgreSQL service → Settings
2. Delete the database service
3. Create a new PostgreSQL service
4. Railway will auto-configure the new database
5. Redeploy backend

---

### Issue 2: Email Service Not Configured

**Symptoms:**
- Registration fails with email error
- Logs show: "Failed to send verification email"

**Solution:** Email configuration is optional for basic registration

**Temporary Fix:**
Update `AuthService.java` to make email sending non-blocking (already done):
```java
try {
    emailService.sendVerificationEmail(...);
} catch (Exception e) {
    System.err.println("Failed to send verification email: " + e.getMessage());
    // Continue with registration even if email fails
}
```

Registration should work even if email fails!

**Permanent Fix:**
Configure SendGrid environment variables in Railway (see PRODUCTION_EMAIL_SETUP.md)

---

### Issue 3: CORS Error

**Symptoms:**
- Browser console: "CORS policy: No 'Access-Control-Allow-Origin' header"
- Registration request fails immediately

**Solution:**
Verify SecurityConfig.java allows your Vercel URL:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "http://localhost:5173",
    "https://skill-sync-delta-amber.vercel.app"
));
```

Already configured! If still having issues:
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Check Railway logs for CORS errors

---

### Issue 4: Railway Not Deployed Yet

**Symptoms:**
- Can't access backend URL
- Logs show old code

**Solution:**
1. Go to Railway → Backend service → Deployments
2. If no new deployment, manually trigger:
   - Click "Deploy" button
   - Or: Settings → Redeploy

---

## Step-by-Step Debug Process

### 1. Check if Backend is Running

Test the health endpoint:
```
https://skillsync-backend-production-cf99.up.railway.app/api/health
```

**Expected:** Should return some response (even 404 is okay, means backend is up)
**If timeout/connection refused:** Backend is down

---

### 2. Test Registration Endpoint Directly

Use browser or Postman to test:

**URL:** `https://skillsync-backend-production-cf99.up.railway.app/api/auth/register`

**Method:** POST

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "username": "testuser123",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "token": "eyJhbGc...",
  "type": "Bearer",
  "userId": 1,
  "username": "testuser123",
  "email": "test@example.com",
  "role": "USER",
  "emailVerified": false
}
```

**Copy the actual error response and check Railway logs**

---

### 3. Check Railway Environment Variables

Go to Railway → Backend service → Variables

**Required for basic operation:**
- ✅ SPRING_DATASOURCE_URL
- ✅ SPRING_DATASOURCE_USERNAME
- ✅ SPRING_DATASOURCE_PASSWORD

**Optional (for email):**
- MAIL_HOST
- MAIL_USERNAME
- MAIL_PASSWORD
- FRONTEND_URL

---

### 4. Check Frontend Environment

1. Check frontend is using correct API URL
2. Open: `frontend/src/services/api.js`
3. Verify: `baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api"`

**For Vercel:**
Check environment variable:
- Go to Vercel → SkillSync project → Settings → Environment Variables
- Verify `VITE_API_URL = https://skillsync-backend-production-cf99.up.railway.app/api`

---

## Quick Fixes

### Fix 1: Force Railway Redeploy

```bash
# Make a small change and push
cd "E:\Projects\Project 1\SkillSync"
git commit --allow-empty -m "Trigger Railway redeploy"
git push origin main
```

### Fix 2: Verify Database Connection

In Railway logs, look for:
```
HikariPool-1 - Start completed.
```

If you see database connection errors, check:
- PostgreSQL service is running
- Environment variables are correct

### Fix 3: Test Without Email

Registration should work even if email fails. Check if:
- User is created in database
- JWT token is returned
- Only email sending fails (which is okay for now)

---

## What Information to Provide

If still not working, please provide:

1. **Browser Console Error:**
   - F12 → Console tab → Copy error message

2. **Network Response:**
   - F12 → Network tab → Click on register request
   - Copy Response body

3. **Railway Logs:**
   - Railway → Backend → Logs
   - Copy last 50 lines (especially errors)

4. **Railway Deployment Status:**
   - Active/Failed/Building?
   - What commit hash is deployed?

5. **What error message shows on screen?**
   - "Registration failed"
   - "Network error"
   - Something else?

---

## Emergency Workaround

If registration is completely broken, you can temporarily revert the email verification:

**Option 1: Deploy old commit (before email verification)**
```bash
git revert HEAD
git push origin main
```

**Option 2: Make registration work without verification**
Comment out verification code in AuthService.java (not recommended)

---

Let me know what you find and I'll help you fix it! 🚀
