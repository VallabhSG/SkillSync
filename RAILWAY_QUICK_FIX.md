# 🚂 Railway Deployment - Quick Fix Guide

## The Problem
Railway couldn't detect how to build your app because you have a monorepo (both `frontend` and `backend` folders).

## The Solution
I've created configuration files that tell Railway to build only the backend.

---

## ✅ What I've Added

### 1. `railway.toml` (in root directory)
Tells Railway:
- Where to build (backend folder)
- What command to use for building
- What command to use for starting
- Health check endpoint

### 2. `nixpacks.toml` (in root directory)  
Configures the build environment:
- Java 17 + Maven
- Build commands
- Start command with port binding

### 3. `HealthController.java` (backend)
Added health check endpoints:
- `/api/health` - For Railway health checks
- `/api` - Root endpoint with welcome message

---

## 🚀 Deploy Steps (Updated)

### Step 1: Push the Config Files
```bash
cd "E:\Projects\Project 1\SkillSync"
git add railway.toml nixpacks.toml backend/src/main/java/com/skillsync/controller/HealthController.java
git commit -m "Add Railway configuration for backend deployment"
git push origin main
```

### Step 2: Create New Railway Project
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your **SkillSync** repository
5. Railway will automatically detect the configuration ✅

### Step 3: Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway auto-creates `DATABASE_URL` variable ✅

### Step 4: Set Environment Variables
Click on your service → **Variables** tab:

```bash
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=your-super-secret-32-character-key-change-this-now
OPENAI_API_KEY=sk-your-key-here  # Optional
```

**Generate a secure JWT secret:**
```bash
# Linux/Mac/Git Bash:
openssl rand -base64 32

# Or use this online: https://www.grc.com/passwords.htm
```

### Step 5: Deploy!
- Railway deploys automatically
- Wait 5-10 minutes
- Check the **Deployments** tab for progress

### Step 6: Get Your Backend URL
1. Click on your service
2. Go to **Settings** → **Networking**
3. Click **"Generate Domain"**
4. Copy the URL (e.g., `https://skillsync-backend-production.up.railway.app`)

### Step 7: Verify It Works
Visit these URLs:

✅ **Health Check:**  
`https://your-backend-url.railway.app/api/health`

Should return:
```json
{
  "status": "UP",
  "timestamp": "2024-01-15T10:30:00",
  "service": "SkillSync API"
}
```

✅ **Root Endpoint:**  
`https://your-backend-url.railway.app/api`

Should return:
```json
{
  "message": "Welcome to SkillSync API",
  "version": "1.0.0",
  "status": "Running"
}
```

---

## 🐛 Troubleshooting

### ❌ "Railpack could not determine how to build"
**Solution:** Make sure you pushed `railway.toml` and `nixpacks.toml` to GitHub first!

```bash
git status  # Check if files are tracked
git add railway.toml nixpacks.toml
git commit -m "Add Railway config"
git push
```

### ❌ Build fails with "Maven not found"
**Solution:** The `nixpacks.toml` should fix this. If it persists:
1. Delete the Railway service
2. Re-push the config files
3. Create a new deployment

### ❌ "Port already in use" or app crashes
**Solution:** The config automatically uses Railway's `$PORT`. Check your logs:
1. Railway Dashboard → Your Service → **Logs**
2. Look for errors

### ❌ Database connection fails
**Solution:** 
1. Make sure PostgreSQL is added to your project
2. Check that `DATABASE_URL` variable exists
3. Restart the deployment

---

## 📊 Monitor Your Deployment

### View Logs
Railway Dashboard → Your Service → **Logs**

### View Metrics
Railway Dashboard → Your Service → **Metrics**

### Redeploy
Railway Dashboard → Your Service → **Deployments** → Click **"Redeploy"**

---

## 🎯 Next Steps

After backend is deployed:

1. **Deploy Frontend** (See DEPLOYMENT.md)
   - Use Vercel or Netlify
   - Set `VITE_API_URL` to your Railway backend URL

2. **Update CORS** (if needed)
   - Add your frontend URL to allowed origins
   - See `SecurityConfig.java`

3. **Test Everything**
   - Register a user
   - Create profile
   - Generate recommendations

---

## 💡 Pro Tips

1. **Free Tier:** Railway gives $5/month credit (≈500 hours)
2. **Auto-Deploy:** Every push to `main` triggers deployment
3. **Environment Variables:** Use Railway's UI - never commit secrets!
4. **Database Backups:** Railway auto-backs up PostgreSQL
5. **Logs:** Check logs first when debugging

---

## 🔗 Useful Commands

```bash
# Check what will be deployed
git ls-files | grep -E "(railway|nixpacks|backend)"

# View Railway config
cat railway.toml

# Test locally first
cd backend
mvn clean package -DskipTests
java -jar target/*.jar
```

---

## ✅ Summary

**Files Added:**
- ✅ `railway.toml` - Railway configuration
- ✅ `nixpacks.toml` - Build environment setup  
- ✅ `HealthController.java` - Health check endpoints

**What They Do:**
- Tell Railway to build from `backend` folder
- Install Java 17 + Maven
- Build with `mvn clean package`
- Start with proper port binding
- Enable health checks

**Result:**
- ✅ No more "Railpack could not determine" error
- ✅ Automatic builds and deploys
- ✅ Working health checks
- ✅ Proper Java environment

---

🎉 **Your backend should now deploy successfully on Railway!**

If you still have issues, check:
1. Config files are pushed to GitHub
2. Railway is connected to the right repo
3. Environment variables are set
4. Check the deployment logs
