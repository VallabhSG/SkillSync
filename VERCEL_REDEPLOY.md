# Vercel Redeployment Guide

## Issue: 404 NOT_FOUND on Vercel

This happens when:
- Frontend code changes are pushed to GitHub
- But Vercel hasn't rebuilt with the new code
- Routes that exist in code show 404

## Solution 1: Redeploy from Dashboard (Easiest) ⭐

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select your project**: skill-sync or SkillSync
3. **Click "Deployments" tab**
4. **Find the latest deployment**
5. **Click three dots (•••) → "Redeploy"**
6. **Confirm the redeploy**
7. **Wait 2-3 minutes**

## Solution 2: Check Git Connection

Vercel should auto-deploy when you push to GitHub.

**Verify Connection:**
1. Vercel Dashboard → Your Project
2. Go to **Settings** → **Git**
3. Check if GitHub repository is connected
4. If not connected:
   - Click "Connect Git Repository"
   - Select your GitHub repo: VallabhSG/SkillSync
   - Choose branch: main
   - Save

**Once connected:**
- Every `git push` to main will auto-deploy
- No manual redeploy needed!

## Solution 3: Trigger via Git Push

If connected to GitHub:

```bash
cd "E:\Projects\Project 1\SkillSync"
git commit --allow-empty -m "chore: trigger Vercel redeploy"
git push origin main
```

This creates an empty commit to trigger Vercel.

## Solution 4: Vercel CLI (Advanced)

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy:
```bash
cd frontend
vercel --prod
```

## Verify Deployment

After redeploying:

1. **Check Deployment Status**:
   - Vercel Dashboard → Deployments
   - Should show "Ready" with green checkmark
   - Check timestamp (should be recent)

2. **Test the Site**:
   - Visit: https://skill-sync-delta-amber.vercel.app
   - Should load without 404
   - Try: https://skill-sync-delta-amber.vercel.app/register
   - Should show registration form

3. **Clear Browser Cache**:
   - Hard refresh: Ctrl + Shift + R (Windows/Linux)
   - Or: Cmd + Shift + R (Mac)

## Common Issues

### Issue: Deployment Fails

**Check Build Logs:**
1. Vercel Dashboard → Deployments
2. Click on failed deployment
3. View build logs
4. Look for error messages

**Common Errors:**
- `npm install` failed → Check package.json
- Build command failed → Check vite.config.js
- Import errors → Check file paths

### Issue: Deployment Succeeds but 404 Persists

**Solutions:**
1. Clear browser cache (Ctrl + Shift + R)
2. Try incognito/private window
3. Check if correct deployment is "Production"
4. Verify domain points to latest deployment

### Issue: Wrong Branch Deployed

**Fix:**
1. Vercel → Settings → Git
2. Set Production Branch to: **main**
3. Redeploy

### Issue: Environment Variables Missing

**Check:**
1. Vercel → Settings → Environment Variables
2. Add: `VITE_API_URL = https://skillsync-backend-production-cf99.up.railway.app/api`
3. Apply to: Production, Preview, Development
4. Redeploy

## Deployment Checklist

- [ ] Latest code pushed to GitHub
- [ ] Vercel connected to GitHub repo
- [ ] Correct branch selected (main)
- [ ] New deployment triggered
- [ ] Deployment shows "Ready" status
- [ ] Environment variables configured
- [ ] Browser cache cleared
- [ ] Site loads without 404
- [ ] All routes work (/register, /login, etc.)

## Quick Status Check

**Test these URLs:**
- ✅ https://skill-sync-delta-amber.vercel.app/ (Home)
- ✅ https://skill-sync-delta-amber.vercel.app/register (Register)
- ✅ https://skill-sync-delta-amber.vercel.app/login (Login)
- ✅ https://skill-sync-delta-amber.vercel.app/verify-email (Verify Email)

All should load without 404 errors.

## Estimated Time

- Triggering redeploy: 30 seconds
- Build + Deploy: 2-3 minutes
- Total: ~3-4 minutes

## Need Help?

If deployment keeps failing:
1. Share build logs from Vercel
2. Check Railway backend is working
3. Verify API_URL environment variable
4. Test backend directly: https://skillsync-backend-production-cf99.up.railway.app/api

---

**Current Status:**
- ✅ Code pushed to GitHub (commit: 9bd5088)
- ⏳ Waiting for Vercel to redeploy
- Check: https://vercel.com/dashboard

Let me know once the deployment completes! 🚀
