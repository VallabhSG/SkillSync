# Mailtrap Setup - Quick Guide

## Why Mailtrap?

Mailtrap is perfect for testing email features without:
- Setting up Gmail App Passwords
- Worrying about 2-Step Verification
- Sending real emails during development
- Spam filtering issues

All emails are captured in a fake inbox that only you can see!

## Setup Steps (5 minutes)

### 1. Create Account

Go to: https://mailtrap.io/signin

**Quick Sign Up Options:**
- Sign in with GitHub (fastest)
- Sign in with Google
- Sign up with email

**Free Tier Includes:**
- 100 test emails/month
- 1 inbox
- Email preview
- HTML/Text view
- Perfect for development!

### 2. Get Your Credentials

After signing in:

1. You'll land on the **Inboxes** page
2. Click on **"My Inbox"** (or the default inbox created for you)
3. Look for **"SMTP Settings"** tab
4. In the "Integrations" dropdown, select **"Spring Boot"** or **"Other"**

You'll see credentials like this:

```
Host: sandbox.smtp.mailtrap.io
Port: 2525 (or 587)
Username: a1b2c3d4e5f6g7  (example)
Password: h8i9j0k1l2m3n4  (example)
Auth: Plain
```

### 3. Set Environment Variables

**Windows Command Prompt:**
```cmd
set MAIL_USERNAME=a1b2c3d4e5f6g7
set MAIL_PASSWORD=h8i9j0k1l2m3n4
set FRONTEND_URL=http://localhost:5173
```

**Windows PowerShell:**
```powershell
$env:MAIL_USERNAME="a1b2c3d4e5f6g7"
$env:MAIL_PASSWORD="h8i9j0k1l2m3n4"
$env:FRONTEND_URL="http://localhost:5173"
```

**macOS/Linux:**
```bash
export MAIL_USERNAME=a1b2c3d4e5f6g7
export MAIL_PASSWORD=h8i9j0k1l2m3n4
export FRONTEND_URL=http://localhost:5173
```

### 4. Update application.properties (Optional)

If you want to hard-code Mailtrap settings for development, edit:
`backend/src/main/resources/application.properties`

Change the email section to:

```properties
# Email Configuration (Mailtrap SMTP - for development)
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=${MAIL_USERNAME:your-mailtrap-username}
spring.mail.password=${MAIL_PASSWORD:your-mailtrap-password}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=false
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000
```

**Note:** Port can be 2525, 587, or 465 - use what Mailtrap shows you.

### 5. Start Application

From the terminal where you set environment variables:

```bash
cd backend
mvn spring-boot:run
```

### 6. Test Email Sending

1. Start frontend: `cd frontend && npm run dev`
2. Go to: http://localhost:5173/register
3. Register a new account (use any email - even fake ones work!)
4. Go to Mailtrap dashboard: https://mailtrap.io/inboxes
5. Click on "My Inbox"
6. **You should see the verification email!** 📧

### 7. Click Verification Link

In Mailtrap:
- Click on the email to open it
- You'll see the HTML preview
- Click the "Verify My Email" button
- It will open the verification link in your browser!

## Troubleshooting

### "Authentication failed"

**Solution:** Double-check username and password
```bash
# Verify they're set correctly
echo %MAIL_USERNAME%  # Windows CMD
echo $env:MAIL_USERNAME  # PowerShell
echo $MAIL_USERNAME  # macOS/Linux
```

### "Could not connect to SMTP host"

**Solutions:**
1. Check if port is correct (try 2525, 587, or 465)
2. Check firewall settings
3. Try changing port in application.properties

### Emails not appearing in Mailtrap

**Solutions:**
1. Check backend console for errors
2. Verify Mailtrap credentials are correct
3. Make sure you're looking at the correct inbox
4. Check if you hit the 100 emails/month limit (unlikely)

## Viewing Emails in Mailtrap

Mailtrap shows you:
- ✅ HTML preview (with styling)
- ✅ Plain text version
- ✅ Email source
- ✅ Headers
- ✅ All links are clickable!
- ✅ Spam score

You can click the verification link directly from Mailtrap!

## Testing Checklist

- [ ] Mailtrap account created
- [ ] SMTP credentials copied
- [ ] Environment variables set
- [ ] Backend started successfully
- [ ] Frontend started successfully
- [ ] Registered test account
- [ ] Email appeared in Mailtrap inbox
- [ ] Email HTML looks good
- [ ] Clicked verification link from Mailtrap
- [ ] Verification succeeded
- [ ] No banner shows for verified user

## Production Migration

When ready for production:
- Replace Mailtrap with SendGrid, AWS SES, or Gmail
- Update environment variables on Railway
- Keep Mailtrap for development/testing

## Need Help?

Common issues:
1. **Forgot to set environment variables** → Set them before running `mvn spring-boot:run`
2. **Wrong credentials** → Copy-paste directly from Mailtrap dashboard
3. **Can't find email** → Refresh Mailtrap inbox page

## Mailtrap Dashboard

Access your inbox: https://mailtrap.io/inboxes

Features:
- Real-time email capture
- Forward emails to real address (testing)
- API access (advanced)
- Multiple inboxes (paid plans)

Happy Testing! 🎉
