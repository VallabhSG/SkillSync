# Google OAuth2 Setup Guide

## Overview

We're implementing "Sign in with Google" - users can register/login using their Google account.

**Benefits:**
- ✅ No password to remember
- ✅ Instant registration
- ✅ Secure (handled by Google)
- ✅ Better user experience

---

## Step 1: Create Google Cloud Project (5 minutes)

### 1.1 Go to Google Cloud Console

Visit: https://console.cloud.google.com/

### 1.2 Create New Project

1. Click on project dropdown (top left, next to "Google Cloud")
2. Click **"New Project"**
3. Fill in:
   - **Project Name**: `SkillSync`
   - **Organization**: Leave as default
4. Click **"Create"**
5. Wait for project creation (~30 seconds)
6. Make sure the new project is selected (check top left)

---

## Step 2: Enable Google+ API (2 minutes)

### 2.1 Enable Required APIs

1. In Google Cloud Console, go to **"APIs & Services" → "Library"**
   - Or direct link: https://console.cloud.google.com/apis/library
2. Search for: **"Google+ API"**
3. Click on it
4. Click **"Enable"**
5. Also search and enable: **"People API"** (recommended)

---

## Step 3: Configure OAuth Consent Screen (3 minutes)

### 3.1 Go to OAuth Consent Screen

1. Go to **"APIs & Services" → "OAuth consent screen"**
   - Or: https://console.cloud.google.com/apis/credentials/consent
2. Select **"External"** (for public apps)
3. Click **"Create"**

### 3.2 Fill in App Information

**App information:**
- **App name**: `SkillSync`
- **User support email**: Your email
- **App logo**: (optional, skip for now)

**App domain (optional for testing):**
- Application home page: `https://skill-sync-delta-amber.vercel.app`
- Privacy policy: (optional)
- Terms of service: (optional)

**Authorized domains:**
- Add: `vercel.app`
- Add: `railway.app`

**Developer contact information:**
- **Email**: Your email

4. Click **"Save and Continue"**

### 3.3 Scopes

1. Click **"Add or Remove Scopes"**
2. Select:
   - ✅ `.../auth/userinfo.email`
   - ✅ `.../auth/userinfo.profile`
   - ✅ `openid`
3. Click **"Update"**
4. Click **"Save and Continue"**

### 3.4 Test Users (For Development)

1. Click **"Add Users"**
2. Add your Gmail address
3. Click **"Save and Continue"**
4. Click **"Back to Dashboard"**

---

## Step 4: Create OAuth 2.0 Credentials (3 minutes)

### 4.1 Create Credentials

1. Go to **"APIs & Services" → "Credentials"**
   - Or: https://console.cloud.google.com/apis/credentials
2. Click **"Create Credentials"** → **"OAuth client ID"**

### 4.2 Configure OAuth Client

**Application type:** `Web application`

**Name:** `SkillSync Web Client`

**Authorized JavaScript origins:**
- `http://localhost:5173` (for local testing)
- `http://localhost:3000` (for local testing)
- `https://skill-sync-delta-amber.vercel.app` (production)

**Authorized redirect URIs:**
- `http://localhost:8080/login/oauth2/code/google` (local backend)
- `https://skillsync-backend-production-cf99.up.railway.app/login/oauth2/code/google` (production backend)

### 4.3 Save Credentials

1. Click **"Create"**
2. **⚠️ COPY AND SAVE THESE IMMEDIATELY:**
   - **Client ID**: Looks like `123456789-abcdefg.apps.googleusercontent.com`
   - **Client Secret**: Looks like `GOCSPX-abc123def456...`
3. Click **"OK"**

---

## Step 5: Configure Backend (application.properties)

Add to `backend/src/main/resources/application.properties`:

```properties
# Google OAuth2 Configuration
spring.security.oauth2.client.registration.google.client-id=${GOOGLE_CLIENT_ID:your-client-id}
spring.security.oauth2.client.registration.google.client-secret=${GOOGLE_CLIENT_SECRET:your-client-secret}
spring.security.oauth2.client.registration.google.scope=profile,email
spring.security.oauth2.client.registration.google.redirect-uri={baseUrl}/login/oauth2/code/google
spring.security.oauth2.client.registration.google.client-name=Google
```

---

## Step 6: Configure Railway Environment Variables

1. **Go to Railway** → Backend service → **Variables**
2. **Add**:
   ```
   GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456...
   ```

---

## Step 7: Frontend Configuration

You'll need to add a "Sign in with Google" button that redirects to:
```
https://skillsync-backend-production-cf99.up.railway.app/oauth2/authorization/google
```

---

## Testing Checklist

### Local Testing:
- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth client created
- [ ] Redirect URIs include localhost
- [ ] Test user added (your Gmail)
- [ ] Backend configured with client ID/secret
- [ ] Frontend has Google sign-in button
- [ ] Click button redirects to Google
- [ ] After login, redirects back to app
- [ ] User is logged in with Google account

### Production Testing:
- [ ] Railway environment variables set
- [ ] Redirect URIs include production URLs
- [ ] Test with real users
- [ ] Check user data saved correctly

---

## Common Issues

### Issue: "Error 403: access_denied"

**Cause:** App is in testing mode, user not in test users list

**Solution:**
1. Go to OAuth consent screen
2. Add user to "Test users"
3. Or publish the app (click "Publish App")

### Issue: "Redirect URI mismatch"

**Cause:** The redirect URI doesn't match what's configured

**Solution:**
1. Check the error message for the actual redirect URI
2. Add it to "Authorized redirect URIs" in credentials
3. Make sure there's no trailing slash difference

### Issue: "Invalid client"

**Cause:** Wrong client ID or secret

**Solution:**
- Double-check credentials in Railway variables
- Make sure no extra spaces
- Regenerate credentials if needed

---

## Security Notes

- ✅ Never commit client secret to Git
- ✅ Use environment variables
- ✅ Rotate secrets if exposed
- ✅ Limit scopes to what you need
- ✅ Monitor OAuth usage in Google Cloud Console

---

## What Data Google Provides

With `profile` and `email` scopes, you get:
- **Email**: user's Gmail address
- **Name**: user's full name
- **Picture**: profile picture URL
- **Google ID**: unique identifier

This is enough to create/login users!

---

## Next Steps After Setup

1. ✅ Create OAuth2 success handler in backend
2. ✅ Save/update user in database
3. ✅ Generate JWT token
4. ✅ Redirect to frontend with token
5. ✅ Store token in frontend
6. ✅ User is logged in!

---

Ready to implement! 🚀
