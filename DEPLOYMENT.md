# 🚀 SkillSync Deployment Guide

Complete guide to deploy SkillSync to production.

---

## 📋 Prerequisites

- GitHub account
- Railway/Render account (for backend)
- Vercel/Netlify account (for frontend)
- PostgreSQL database (provided by hosting platform)

---

## 🗄️ Part 1: Deploy Backend (Railway - Recommended)

### Option A: Deploy to Railway

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your SkillSync repository
   - Select the `backend` folder

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will auto-configure DATABASE_URL

4. **Set Environment Variables**
   ```
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   OPENAI_API_KEY=your-openai-api-key (optional)
   ```

5. **Configure Build**
   - Root Directory: `backend`
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/*.jar`

6. **Deploy**
   - Click "Deploy"
   - Wait 5-10 minutes
   - Copy your backend URL (e.g., `https://skillsync-backend.up.railway.app`)

### Option B: Deploy to Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your repository
   - Root Directory: `backend`

3. **Configure Service**
   ```
   Name: skillsync-backend
   Environment: Java
   Build Command: mvn clean package -DskipTests
   Start Command: java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/*.jar
   ```

4. **Add PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Note the internal database URL

5. **Set Environment Variables**
   ```
   DATABASE_URL=<your-postgres-url>
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
   OPENAI_API_KEY=your-openai-api-key (optional)
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy your backend URL

---

## 🎨 Part 2: Deploy Frontend (Vercel - Recommended)

### Option A: Deploy to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your SkillSync repository
   - Root Directory: `frontend`

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.railway.app/api
   ```
   Replace with your actual backend URL from Step 1

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `https://skillsync-xxx.vercel.app`

### Option B: Deploy to Netlify

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Base directory: `frontend`

3. **Configure Build**
   ```
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Set Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add: `VITE_API_URL` = `https://your-backend-url/api`

5. **Deploy**
   - Click "Deploy site"
   - Your app will be live at `https://skillsync-xxx.netlify.app`

---

## 🔧 Part 3: Configure CORS

Update your backend's `SecurityConfig.java` to allow your frontend URL:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:3000",
    "http://localhost:5173",
    "https://your-frontend-url.vercel.app"  // Add your deployed URL
));
```

Or set it via environment variable:
```
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
```

---

## 🗄️ Part 4: Database Setup

### Initial Data Load

The `data.sql` file will automatically populate:
- Sample courses
- Sample skills
- Project ideas

### Database Migrations

For production updates:
1. Use `spring.jpa.hibernate.ddl-auto=update` (set in application-prod.properties)
2. Create migration scripts for major changes
3. Backup database before updates

---

## 🔐 Part 5: Environment Variables Reference

### Backend (.env or hosting platform)
```bash
# Required
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET=your-very-long-secret-key-at-least-32-characters
SPRING_PROFILES_ACTIVE=prod

# Optional
OPENAI_API_KEY=sk-your-openai-key
PORT=8080
```

### Frontend (.env.production)
```bash
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Part 6: Verification Checklist

After deployment, verify:

- [ ] Backend is running (visit `/api` endpoint)
- [ ] Database is connected (check logs)
- [ ] Frontend can reach backend
- [ ] User registration works
- [ ] Login works
- [ ] Profile creation works
- [ ] AI recommendations work
- [ ] Course links work
- [ ] CORS is properly configured

---

## 🐛 Troubleshooting

### Backend Issues

**Build fails:**
```bash
# Check Java version
java -version  # Should be 17+

# Clear Maven cache
mvn clean install -U
```

**Database connection fails:**
- Verify DATABASE_URL format
- Check database is running
- Verify network access

**API returns 500 errors:**
- Check application logs
- Verify all environment variables are set
- Check database migrations

### Frontend Issues

**Build fails:**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Can't connect to backend:**
- Verify VITE_API_URL is correct
- Check CORS settings
- Verify backend is running

**Environment variables not working:**
- Vercel: Must start with `VITE_`
- Netlify: Redeploy after adding variables
- Check build logs

---

## 📊 Monitoring

### Railway
- View logs: Dashboard → Logs
- View metrics: Dashboard → Metrics
- Set up alerts: Dashboard → Settings

### Vercel
- Analytics: Dashboard → Analytics
- Logs: Dashboard → Deployments → View logs
- Performance: Built-in Web Vitals

---

## 🔄 Continuous Deployment

### Automatic Deployment

Both Railway and Vercel support automatic deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update feature"
   git push origin main
   ```

2. **Auto-deploy triggers**
   - Backend deploys automatically
   - Frontend deploys automatically
   - Check deployment status in dashboard

### Manual Deployment

**Redeploy without changes:**
- Railway: Click "Deploy" → "Redeploy"
- Vercel: Go to Deployments → Click "Redeploy"

---

## 💰 Pricing

### Free Tier Limits

**Railway:**
- $5 free credits/month
- ~500 hours runtime
- Perfect for hobby projects

**Render:**
- Free tier available
- 750 hours/month
- Sleeps after 15 min inactivity

**Vercel:**
- 100GB bandwidth/month
- Unlimited deployments
- Perfect for frontend

**Netlify:**
- 100GB bandwidth/month
- 300 build minutes/month

---

## 🎯 Production Best Practices

1. **Security**
   - Use strong JWT secrets
   - Enable HTTPS only
   - Keep dependencies updated
   - Never commit secrets

2. **Performance**
   - Enable database indexing
   - Use connection pooling
   - Compress frontend assets
   - Enable caching

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Track user analytics
   - Set up uptime monitoring

4. **Backup**
   - Regular database backups
   - Export user data periodically
   - Version control everything

---

## 🔗 Useful Links

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Spring Boot on Railway](https://docs.railway.app/guides/spring-boot)

---

## 📧 Support

If you encounter issues:
1. Check logs in your hosting dashboard
2. Review this deployment guide
3. Check GitHub Issues
4. Contact support@skillsync.com

---

**Your SkillSync application is now live! 🎉**

Share your deployment URL and start helping people plan their careers!
