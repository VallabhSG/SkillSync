# Email Verification - Local Testing Guide

This guide will help you test the email verification feature locally.

## Prerequisites

- Email testing service account (Mailtrap or Gmail)
- Backend and Frontend running locally

## Email Service Options

### Option 1: Mailtrap (Recommended for Testing) 🎯

**Pros:** 
- No Gmail setup needed
- Free tier available
- Captures all emails without sending
- Perfect for development/testing

**Cons:**
- Emails don't actually arrive in real inbox
- Need to check Mailtrap dashboard

### Option 2: Gmail with App Password

**Pros:**
- Real emails sent to real inbox
- Production-ready

**Cons:**
- Requires 2-Step Verification
- Not available for all accounts (school/work emails)

## Setup Instructions

Choose one of the options below:

---

## Option 1: Mailtrap Setup (Easiest) ⭐

### Step 1A: Create Mailtrap Account

1. **Go to Mailtrap**: https://mailtrap.io/
2. **Sign up for free**:
   - Click "Sign Up"
   - Use Google/GitHub sign-in or email
   - Free tier: 100 emails/month (perfect for testing)

3. **Get SMTP Credentials**:
   - After login, you'll see "My Inbox"
   - Click on "My Inbox" or your inbox name
   - Go to "SMTP Settings"
   - Select "Spring Boot" or "Other" from dropdown
   
4. **Copy Credentials**:
   You'll see something like:
   ```
   Host: sandbox.smtp.mailtrap.io
   Port: 587 or 2525
   Username: [random string]
   Password: [random string]
   ```

### Step 1B: Configure Mailtrap in Spring Boot

Edit `backend/src/main/resources/application.properties`:

```properties
# Email Configuration (Mailtrap SMTP - for development)
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=${MAIL_USERNAME:your-mailtrap-username}
spring.mail.password=${MAIL_PASSWORD:your-mailtrap-password}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

Then set environment variables with your Mailtrap credentials:
```bash
set MAIL_USERNAME=your-mailtrap-username
set MAIL_PASSWORD=your-mailtrap-password
set FRONTEND_URL=http://localhost:5173
```

**To Check Emails:**
- Go to Mailtrap dashboard
- Click on "My Inbox"
- All sent emails will appear here
- You can click the verification link directly from Mailtrap!

---

## Option 2: Gmail Setup (For Real Emails)

### Step 1: Generate Gmail App Password

1. **Go to Google Account Security**: https://myaccount.google.com/security
2. **Enable 2-Step Verification** (if not already enabled):
   - Click on "2-Step Verification"
   - Follow the setup instructions
3. **Create App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select app: **Mail**
   - Select device: **Other (Custom name)** → Enter "SkillSync"
   - Click **Generate**
   - **Copy the 16-character password** (format: `xxxx xxxx xxxx xxxx`)
   - ⚠️ **Save it immediately** - you won't be able to see it again!

## Step 2: Configure Environment Variables

### Option A: Using System Environment Variables (Recommended)

**Windows (Command Prompt):**
```cmd
set MAIL_USERNAME=your-email@gmail.com
set MAIL_PASSWORD=your-16-char-app-password
set FRONTEND_URL=http://localhost:5173
```

**Windows (PowerShell):**
```powershell
$env:MAIL_USERNAME="your-email@gmail.com"
$env:MAIL_PASSWORD="your-16-char-app-password"
$env:FRONTEND_URL="http://localhost:5173"
```

**macOS/Linux (Bash/Zsh):**
```bash
export MAIL_USERNAME=your-email@gmail.com
export MAIL_PASSWORD=your-16-char-app-password
export FRONTEND_URL=http://localhost:5173
```

### Option B: Using .env File (Alternative)

Edit the `.env` file in the `backend` directory:

```properties
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-char-app-password
FRONTEND_URL=http://localhost:5173
```

**Note:** You'll need to add a library like `spring-boot-dotenv` to read .env files, or use Option A.

## Step 3: Start the Application

### Start Backend:

```bash
cd backend
mvn spring-boot:run
```

Or if using IntelliJ IDEA:
- Right-click on `SkillSyncApplication.java`
- Select "Run 'SkillSyncApplication'"
- Make sure environment variables are set in the Run Configuration

### Start Frontend:

```bash
cd frontend
npm run dev
```

Frontend will be available at: http://localhost:5173

## Step 4: Test the Email Verification Flow

### Test Case 1: New User Registration

1. **Register a new account**:
   - Go to: http://localhost:5173/register
   - Fill in the form with a **real email address** you can access
   - Click "Create Account"

2. **Verify Registration Success Screen**:
   - ✅ Should see "Check Your Email!" screen
   - ✅ Shows your email address
   - ✅ Shows next steps instructions
   - ✅ Has "Go to Login" and "Register Another" buttons

3. **Check Backend Console**:
   - Look for: "Verification email sent to: [your-email]"
   - If you see errors, check SMTP configuration

4. **Check Your Email**:
   - Open your email inbox
   - Look for email from "SkillSync" or your configured email
   - ✅ Subject should be: "Verify Your Email - SkillSync"
   - ✅ Email should be nicely formatted with HTML
   - ✅ Should contain a verification link

5. **Click Verification Link**:
   - Click the "Verify My Email" button in the email
   - Should redirect to: http://localhost:5173/verify-email?token=...
   - ✅ Should see loading spinner initially
   - ✅ Should show "Email Verified!" success message
   - ✅ Should auto-redirect to login after 3 seconds

6. **Login with Verified Account**:
   - Login with your credentials
   - Go to Dashboard
   - ✅ **Verification banner should NOT appear** (email is verified)

### Test Case 2: Unverified User Experience

1. **Register another account** (or use one that's not verified)
2. **Close the "Check Your Email" screen** without verifying
3. **Login directly** with the unverified account
4. **Go to Dashboard**:
   - ✅ Should see yellow verification banner at the top
   - ✅ Banner shows your email address
   - ✅ Has "Resend Verification Email" button
   - ✅ Has dismiss (X) button

### Test Case 3: Resend Verification Email

1. **From Dashboard** (while logged in as unverified user):
   - Click "Resend Verification Email" button
   - ✅ Button should show "Sending..." loading state
   - ✅ Should show success toast notification
   - ✅ Check email inbox for new verification email

2. **From Verify Email Page**:
   - Go to: http://localhost:5173/verify-email
   - Enter your email in the resend form
   - Click "Resend Verification Email"
   - ✅ Should show success message
   - ✅ Check email inbox

### Test Case 4: Token Expiry (Manual Test)

1. **Database Check**:
   - Access H2 Console: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:skillsyncdb`
   - Username: `sa`
   - Password: (leave blank)
   
2. **View Tokens**:
   ```sql
   SELECT * FROM verification_tokens;
   ```
   - ✅ Should see your verification tokens
   - ✅ `expiry_date` should be 24 hours from `created_at`

3. **Manually Expire Token** (for testing):
   ```sql
   UPDATE verification_tokens 
   SET expiry_date = CURRENT_TIMESTAMP - INTERVAL '1' HOUR
   WHERE token = 'your-token-here';
   ```

4. **Try Using Expired Token**:
   - Click the verification link
   - ✅ Should show error: "Token has expired. Please request a new verification email"
   - ✅ Should display resend form

### Test Case 5: Token Reuse Prevention

1. **Verify an email successfully**
2. **Try using the same verification link again**:
   - Click the verification link again
   - ✅ Should show error: "Token has already been used"

## Step 5: Verify Database Changes

Access H2 Console: http://localhost:8080/h2-console

**Check User Email Verification Status:**
```sql
SELECT id, username, email, email_verified, auth_provider 
FROM users;
```
✅ `email_verified` should be `TRUE` for verified users

**Check Verification Tokens:**
```sql
SELECT id, token, user_id, expiry_date, created_at, used 
FROM verification_tokens;
```
✅ `used` should be `TRUE` for tokens that have been verified

## Troubleshooting

### Email Not Sending

**Problem:** No email received or console shows SMTP errors

**Solutions:**
1. **Check Gmail App Password**:
   - Make sure you copied it correctly (16 characters, no spaces)
   - Try generating a new App Password

2. **Check Environment Variables**:
   ```bash
   # Windows CMD
   echo %MAIL_USERNAME%
   echo %MAIL_PASSWORD%
   
   # PowerShell
   echo $env:MAIL_USERNAME
   echo $env:MAIL_PASSWORD
   
   # macOS/Linux
   echo $MAIL_USERNAME
   echo $MAIL_PASSWORD
   ```

3. **Check Backend Console for Errors**:
   - Look for: `javax.mail.AuthenticationFailedException`
   - Look for: `Could not connect to SMTP host`

4. **Verify 2-Step Verification is Enabled**:
   - Go to: https://myaccount.google.com/security
   - 2-Step Verification must be ON

5. **Check Gmail Security**:
   - Sometimes Gmail blocks login attempts
   - Check: https://myaccount.google.com/notifications
   - Allow the SkillSync app if blocked

### Frontend Not Receiving emailVerified Status

**Problem:** Verification banner always shows even after verification

**Solutions:**
1. **Check AuthContext**:
   - Verify `user.emailVerified` is being stored in context
   - Check browser console for errors

2. **Clear Browser Storage**:
   ```javascript
   // In browser console
   localStorage.clear();
   sessionStorage.clear();
   ```
   - Then login again

3. **Verify Backend Response**:
   - Check Network tab in browser DevTools
   - Look at `/api/auth/login` or `/api/auth/register` response
   - Should include: `"emailVerified": true/false`

### Verification Link Not Working

**Problem:** Clicking verification link shows errors

**Solutions:**
1. **Check Frontend URL**:
   - Verify `FRONTEND_URL` is set to `http://localhost:5173`
   - Check email source to see the actual URL

2. **Check Backend API**:
   - Backend should be running on: http://localhost:8080
   - Test endpoint: http://localhost:8080/api/verification/verify?token=test

3. **CORS Issues**:
   - Check browser console for CORS errors
   - Verify SecurityConfig allows localhost:5173

## Expected Email Content

**Subject:** Verify Your Email - SkillSync

**Body Preview:**
```
Hi [Username]!

Welcome to SkillSync! We're excited to have you on board.

Please verify your email address to get started with:
✓ AI-powered career recommendations
✓ Personalized learning paths
✓ Skill gap analysis
✓ Progress tracking

[Verify My Email Button]

This link will expire in 24 hours.
```

## Testing Checklist

- [ ] Gmail App Password generated
- [ ] Environment variables configured
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register new user
- [ ] "Check Your Email" screen displays
- [ ] Verification email received
- [ ] Email HTML formatting looks good
- [ ] Verification link works
- [ ] Shows success message on verification
- [ ] Redirects to login after verification
- [ ] Verified user does NOT see banner
- [ ] Unverified user SEES banner
- [ ] Resend email works from Dashboard
- [ ] Resend email works from VerifyEmail page
- [ ] Expired token shows error
- [ ] Used token shows error
- [ ] Database records updated correctly

## Next Steps After Testing

Once local testing is successful:

1. **Configure Production Email Service**:
   - Option A: Gmail with App Password (not recommended for production)
   - Option B: SendGrid (recommended - 100 free emails/day)
   - Option C: AWS SES (recommended for scale)

2. **Update Railway Environment Variables**:
   ```
   MAIL_USERNAME=your-production-email
   MAIL_PASSWORD=your-production-password
   FRONTEND_URL=https://skill-sync-delta-amber.vercel.app
   ```

3. **Deploy and Test Production**:
   - Deploy backend to Railway
   - Deploy frontend to Vercel
   - Test complete flow in production

## Support

If you encounter issues:
1. Check backend console logs
2. Check browser console (F12)
3. Verify all environment variables
4. Test SMTP connection manually
5. Review this guide again

Happy Testing! 🚀
