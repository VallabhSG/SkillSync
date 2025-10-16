# 🔧 Railway Deployment Troubleshooting Guide

## Issues Fixed in This Update

### ✅ Health Check Endpoint Issue - FIXED

**Problem:** "The health check endpoint didn't respond as expected"

**Root Causes Identified & Fixed:**

1. **Spring Security was blocking health endpoints** ✅ FIXED
   - Added `/api/health`, `/api`, and `/actuator/health/**` to permitAll()
   
2. **Database connection configuration issue** ✅ FIXED
   - Railway provides `DATABASE_URL` with embedded credentials
   - Removed separate `DB_USERNAME` and `DB_PASSWORD` requirements
   
3. **Missing Spring Boot Actuator** ✅ FIXED
   - Added `spring-boot-starter-actuator` dependency
   - Configured actuator endpoints in production properties

4. **Incorrect start command** ✅ FIXED
   - Updated to explicitly set `$PORT` and `spring.profiles.active=prod`

---

## 📝 Changes Made

### 1. `backend/pom.xml`
Added Spring Boot Actuator for robust health checks:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### 2. `backend/src/main/resources/application-prod.properties`
- Fixed PostgreSQL connection to use Railway's `DATABASE_URL`
- Added Actuator configuration:
```properties
# Actuator Configuration for Health Checks
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=always
management.health.db.enabled=true
```

### 3. `backend/src/main/java/com/skillsync/config/SecurityConfig.java`
Allowed public access to health endpoints:
```java
.requestMatchers("/api/health").permitAll()
.requestMatchers("/api/").permitAll()
.requestMatchers("/api").permitAll()
.requestMatchers("/actuator/health/**").permitAll()
.requestMatchers("/actuator/info").permitAll()
```

### 4. `railway.toml`
- Removed custom health check path (using Railway's default)
- Fixed start command with proper environment variables

### 5. `backend/src/main/java/com/skillsync/controller/HealthController.java`
Created custom health endpoints:
- `/api/health` - Custom health check
- `/api` - Welcome/root endpoint

---

## 🚀 Deployment Steps (Updated)

### Step 1: Commit and Push Changes
```bash
cd "E:\Projects\Project 1\SkillSync"

git add .
git commit -m "Fix Railway health check and database configuration"
git push origin main
```

### Step 2: Deploy on Railway

1. **If you already created a Railway project:**
   - Go to your Railway dashboard
   - Click on your SkillSync service
   - Go to **Deployments** tab
   - Railway will auto-deploy the new changes
   - Wait 5-10 minutes

2. **If starting fresh:**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select SkillSync repository
   - Railway will automatically detect configuration

### Step 3: Add PostgreSQL Database

1. In Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically creates `DATABASE_URL` variable ✅

### Step 4: Set Environment Variables

Go to your service → **Variables** tab:

**Required:**
```bash
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=<generate-a-32-character-secret>
```

**Optional:**
```bash
OPENAI_API_KEY=sk-your-openai-key
```

**Generate JWT Secret:**
```bash
# Linux/Mac/Git Bash:
openssl rand -base64 32

# Or use online generator:
# https://www.grc.com/passwords.htm
```

### Step 5: Generate Domain & Test

1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy your URL (e.g., `https://skillsync-backend-production.up.railway.app`)

### Step 6: Verify All Endpoints

Test these URLs (replace with your actual domain):

✅ **Spring Boot Actuator Health:**
```
https://your-app.railway.app/actuator/health
```
Expected response:
```json
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP"
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

✅ **Custom Health Endpoint:**
```
https://your-app.railway.app/api/health
```
Expected response:
```json
{
  "status": "UP",
  "timestamp": "2024-01-15T10:30:00",
  "service": "SkillSync API"
}
```

✅ **Root API Endpoint:**
```
https://your-app.railway.app/api
```
Expected response:
```json
{
  "message": "Welcome to SkillSync API",
  "version": "1.0.0",
  "status": "Running"
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Health check endpoint didn't respond"

**Solution:** Already fixed in this update! If still occurring:

1. **Check Deploy Logs:**
   - Railway Dashboard → Your Service → **Logs**
   - Look for startup errors

2. **Common startup errors:**

   **Error:** `Unable to connect to database`
   ```
   Solution: 
   - Ensure PostgreSQL is added to project
   - Check DATABASE_URL variable exists
   - Restart deployment
   ```

   **Error:** `Port already in use`
   ```
   Solution:
   - Check railway.toml has correct start command
   - Should include: -Dserver.port=$PORT
   ```

   **Error:** `JWT_SECRET environment variable is not set`
   ```
   Solution:
   - Add JWT_SECRET in Variables tab
   - Must be at least 32 characters
   ```

### Issue 2: Build Fails

**Check these in order:**

1. **Maven build error:**
   ```
   Railway Dashboard → Deployments → View Build Logs
   
   If you see "Failed to execute goal":
   - Check pom.xml is valid
   - Ensure Java 17 is specified in nixpacks.toml
   ```

2. **Out of memory:**
   ```
   Solution: In Railway settings, increase memory allocation
   Settings → Resources → Increase memory to 1GB
   ```

3. **Dependencies not found:**
   ```
   Solution: Clear cache and rebuild
   - Settings → Delete deployment
   - Trigger new deployment
   ```

### Issue 3: Database Connection Fails

**Checklist:**

- [ ] PostgreSQL database is added to Railway project
- [ ] `DATABASE_URL` variable exists (auto-created by Railway)
- [ ] Database is in the same region as your service
- [ ] Check connection in logs: `Railway → Logs → Filter: "database"`

**Debug steps:**
```bash
# 1. Check if DATABASE_URL is set
Railway Dashboard → Service → Variables → Look for DATABASE_URL

# 2. Check database is running
Railway Dashboard → Database → Status should be "Active"

# 3. Check logs for connection errors
Look for: "HikariPool" or "Connection refused"
```

### Issue 4: 502 Bad Gateway

**Causes & Solutions:**

1. **App not binding to Railway's port:**
   ```
   Fix: Ensure start command includes -Dserver.port=$PORT
   Already fixed in railway.toml
   ```

2. **App crashed on startup:**
   ```
   Fix: Check Logs tab for error messages
   Common: Missing environment variables
   ```

3. **Database not ready:**
   ```
   Fix: Wait 2-3 minutes for database to initialize
   Check database logs
   ```

### Issue 5: CORS Errors from Frontend

**Solution:**

Update `SecurityConfig.java` with your frontend URL:
```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "https://your-frontend.vercel.app"  // Add your deployed frontend
));
```

Or set environment variable:
```bash
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## 📊 Monitoring & Debugging

### View Logs in Real-Time

```
Railway Dashboard → Your Service → Logs
```

**Filter logs:**
- Click filter icon
- Search for keywords: `ERROR`, `Exception`, `Failed`

### Check Resource Usage

```
Railway Dashboard → Your Service → Metrics
```

Monitor:
- CPU usage
- Memory usage
- Request count
- Response times

### Database Console

```
Railway Dashboard → PostgreSQL → Data
```

- View tables
- Run SQL queries
- Check data initialization

---

## 🧪 Testing Checklist

After deployment, test in this order:

- [ ] Health endpoints respond (both `/api/health` and `/actuator/health`)
- [ ] Root endpoint `/api` works
- [ ] Can register new user: `POST /api/auth/register`
- [ ] Can login: `POST /api/auth/login`
- [ ] Can create profile (needs authentication)
- [ ] Database has sample data (courses, skills)
- [ ] CORS works from frontend
- [ ] JWT tokens are being generated

---

## 🔍 Environment Variables Reference

### Required Variables

```bash
# Railway auto-creates this when you add PostgreSQL
DATABASE_URL=postgresql://user:pass@host:5432/db

# You must set these manually
SPRING_PROFILES_ACTIVE=prod
JWT_SECRET=your-32-character-secret-here
```

### Optional Variables

```bash
# For AI features (optional)
OPENAI_API_KEY=sk-your-openai-api-key

# For custom CORS (optional)
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## 🎯 Next Steps After Successful Deployment

1. **Test Backend API:**
   - Use Postman/Insomnia to test endpoints
   - Register a test user
   - Create a profile

2. **Deploy Frontend:**
   - See `DEPLOYMENT.md` for Vercel deployment
   - Set `VITE_API_URL` to your Railway backend URL
   - Update CORS in backend with frontend URL

3. **Monitor Application:**
   - Set up Railway notifications
   - Check logs daily
   - Monitor resource usage

4. **Security Hardening:**
   - Change default JWT secret
   - Enable rate limiting
   - Review CORS settings
   - Set up alerts

---

## 📞 Getting Help

### Check These First:

1. **Railway Status:** https://status.railway.app
2. **Railway Docs:** https://docs.railway.app
3. **Spring Boot Logs:** Railway Dashboard → Logs

### Common Log Locations:

```bash
# Application startup
Look for: "Started SkillSyncApplication"

# Database connection
Look for: "HikariPool" or "Hibernate"

# Security config
Look for: "SecurityFilterChain"

# Errors
Look for: "ERROR", "Exception", "Failed"
```

---

## ✅ Success Indicators

Your deployment is working when:

- ✅ `/actuator/health` returns `{"status":"UP"}`
- ✅ `/api/health` returns custom health check
- ✅ `/api` returns welcome message
- ✅ Logs show "Started SkillSyncApplication"
- ✅ No errors in deployment logs
- ✅ Database connection successful
- ✅ Can register and login users

---

## 🎉 Deployment Complete!

Once all checks pass:

1. **Save your backend URL:** `https://your-app.railway.app`
2. **Use it in frontend:** Set as `VITE_API_URL`
3. **Share & Test:** Your API is live!

Need help? Check the logs first, then review this guide.

**Happy Deploying! 🚀**
