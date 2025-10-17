# Production Email Configuration Guide

## Recommended Service: SendGrid ⭐

**Why SendGrid?**
- ✅ Free tier: 100 emails/day forever (3,000/month)
- ✅ No credit card required
- ✅ Professional delivery rates
- ✅ Email analytics
- ✅ Easy SMTP setup
- ✅ Trusted by production apps

## SendGrid Setup (10 minutes)

### Step 1: Create SendGrid Account

1. **Go to SendGrid**: https://signup.sendgrid.com/
2. **Sign up for free**:
   - Fill in your details
   - Use a real email address (you'll need to verify it)
   - No credit card required!
3. **Verify your email** (check inbox)
4. **Complete onboarding**:
   - Select "Web API" or "SMTP Relay" (either works)
   - Skip additional setup for now

### Step 2: Create API Key for SMTP

1. **Go to Settings → API Keys**: https://app.sendgrid.com/settings/api_keys
2. **Click "Create API Key"**
3. **Name**: `SkillSync-Production`
4. **Permissions**: Select "Full Access" or "Mail Send" only
5. **Click "Create & View"**
6. **⚠️ COPY THE API KEY IMMEDIATELY** (you won't see it again!)
   - It looks like: `SG.abc123def456ghi789...`

### Step 3: Verify Sender Identity

**Important:** SendGrid requires sender verification to prevent spam.

**Option A: Single Sender Verification (Easiest for Free Tier)**

1. **Go to Settings → Sender Authentication**: https://app.sendgrid.com/settings/sender_auth
2. **Click "Verify a Single Sender"**
3. **Fill in details**:
   - From Name: `SkillSync`
   - From Email: `your-email@gmail.com` (use your real email)
   - Reply To: Same as From Email
   - Company Address: Your address (required)
4. **Click "Create"**
5. **Check your email and verify the sender**

**Option B: Domain Authentication (For Custom Domains)**

If you have a custom domain (e.g., skillsync.com):
1. Go to Settings → Sender Authentication
2. Click "Authenticate Your Domain"
3. Follow DNS setup instructions

### Step 4: SMTP Credentials

SendGrid SMTP settings:
```
Host: smtp.sendgrid.net
Port: 587 (or 465 for SSL)
Username: apikey (literally the word "apikey")
Password: SG.abc123def456... (your actual API key from Step 2)
```

### Step 5: Configure Railway Environment Variables

1. **Go to your Railway project**: https://railway.app/
2. **Click on your backend service**
3. **Go to "Variables" tab**
4. **Add these environment variables**:

```
MAIL_USERNAME=apikey
MAIL_PASSWORD=SG.your-actual-api-key-here
MAIL_FROM=your-verified-email@gmail.com
FRONTEND_URL=https://skill-sync-delta-amber.vercel.app
```

**Important:** 
- `MAIL_USERNAME` is literally `apikey` (don't change this!)
- `MAIL_PASSWORD` is your SendGrid API key
- `MAIL_FROM` must match the verified sender email

### Step 6: Update Backend Code

Update `EmailService.java` to use configurable "from" address.

## Alternative: Mailtrap for Production

If you want to use Mailtrap for production (not recommended but possible):

1. **Upgrade to paid plan**: https://mailtrap.io/pricing
   - Starts at $10/month for real email sending
2. **Use Mailtrap Email API**:
   - Different from SMTP sandbox
   - Can send to real email addresses

## Alternative: Gmail for Production (Not Recommended)

**Limitations:**
- 500 emails/day limit
- Requires App Password
- May get blocked/flagged
- Not professional for production

**If you must use Gmail:**

1. Enable 2-Step Verification: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use these Railway variables:
   ```
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-16-char-app-password
   FRONTEND_URL=https://skill-sync-delta-amber.vercel.app
   ```

## Update Application Configuration

### Update application.properties

Current config should work, but let's ensure it's production-ready:

```properties
# Email Configuration (Production)
spring.mail.host=${MAIL_HOST:smtp.sendgrid.net}
spring.mail.port=${MAIL_PORT:587}
spring.mail.username=${MAIL_USERNAME:apikey}
spring.mail.password=${MAIL_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true
spring.mail.properties.mail.smtp.connectiontimeout=5000
spring.mail.properties.mail.smtp.timeout=5000
spring.mail.properties.mail.smtp.writetimeout=5000

# Application URL Configuration
app.frontend.url=${FRONTEND_URL:https://skill-sync-delta-amber.vercel.app}
```

### Update EmailService.java (Optional)

Add configurable "from" email address:

```java
@Value("${spring.mail.username}")
private String fromEmail;

// Or use a separate property
@Value("${mail.from:noreply@skillsync.com}")
private String fromEmail;
```

Update email sending to use this:
```java
helper.setFrom(fromEmail);
```

## Railway Environment Variables Summary

Add these to your Railway backend service:

| Variable | Value | Description |
|----------|-------|-------------|
| `MAIL_HOST` | `smtp.sendgrid.net` | SendGrid SMTP host (optional, defaults in code) |
| `MAIL_PORT` | `587` | SMTP port (optional, defaults in code) |
| `MAIL_USERNAME` | `apikey` | SendGrid username (literally "apikey") |
| `MAIL_PASSWORD` | `SG.abc123...` | Your SendGrid API key |
| `FRONTEND_URL` | `https://skill-sync-delta-amber.vercel.app` | Your Vercel frontend URL |

## Testing in Production

After deployment:

1. **Register a new account** on production site
2. **Use a real email address**
3. **Check email inbox** (not spam folder)
4. **Click verification link**
5. **Verify it works**

## Monitoring Email Delivery

### SendGrid Dashboard

- **View sent emails**: https://app.sendgrid.com/email_activity
- **Check delivery status**
- **View open/click rates** (if enabled)
- **See bounces/spam reports**

### Common Issues

**Emails going to spam:**
- Make sure sender is verified
- Use professional "from" name and email
- Avoid spam trigger words
- Add SPF/DKIM records (domain authentication)

**Emails not sending:**
- Check Railway logs for errors
- Verify API key is correct
- Check SendGrid activity log
- Verify sender email is authenticated

**Authentication failed:**
- Double-check username is `apikey`
- Verify API key is copied correctly
- Check API key permissions (needs "Mail Send")

## Cost Comparison

| Service | Free Tier | Paid Plans | Best For |
|---------|-----------|------------|----------|
| **SendGrid** | 100/day (3,000/month) | From $15/month (40k emails) | Production apps ⭐ |
| **Mailgun** | 100/day (first month) | From $35/month (50k emails) | High volume |
| **AWS SES** | 62,000/month (if on EC2) | $0.10 per 1,000 emails | AWS users |
| **Gmail** | 500/day | N/A | Development only |
| **Mailtrap** | Testing only | From $10/month | Development |

## SendGrid Free Tier Limits

- ✅ 100 emails/day (3,000/month)
- ✅ No credit card required
- ✅ No expiration
- ✅ Email API access
- ✅ Basic analytics
- ✅ Single sender verification

**Perfect for:**
- Early stage startups
- MVP/prototype apps
- Low-volume apps (<100 users registering per day)

## Deployment Checklist

- [ ] SendGrid account created
- [ ] API key generated and saved
- [ ] Sender email verified
- [ ] Railway environment variables added
- [ ] Code committed and pushed
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Test registration on production
- [ ] Verify email received
- [ ] Test verification link works
- [ ] Check SendGrid activity log

## Support Resources

**SendGrid:**
- Docs: https://docs.sendgrid.com/
- Support: https://support.sendgrid.com/
- Status: https://status.sendgrid.com/

**Common SendGrid Errors:**
- 401 Unauthorized: Wrong API key or username
- 403 Forbidden: API key doesn't have Mail Send permission
- 400 Bad Request: Invalid from email or unverified sender

## Next Steps

1. ✅ Create SendGrid account
2. ✅ Get API key
3. ✅ Verify sender email
4. ✅ Add Railway environment variables
5. ✅ Commit and push code changes
6. ✅ Deploy to production
7. ✅ Test email verification

Let's get started! 🚀
