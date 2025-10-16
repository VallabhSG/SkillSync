# 🎯 START HERE - Complete Setup & Deployment Guide

**Follow these steps in order to get SkillSync running and deployed!**

---

## ✅ Step 1: Test Locally (10 minutes)

### Backend

```bash
# Open terminal in SkillSync/backend
cd "E:\Projects\Project 1\SkillSync\backend"

# Run the application
mvn spring-boot:run
```

✅ **Verify**: Backend should start on http://localhost:8080

### Frontend

```bash
# Open NEW terminal in SkillSync/frontend
cd "E:\Projects\Project 1\SkillSync\frontend"

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ **Verify**: Frontend should start on http://localhost:3000

### Test the Application

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. Go to Profile page
5. Upload a TXT resume file (works best!)
6. Verify skills are extracted
7. Save profile
8. Go to Recommendations
9. Click "Generate Recommendations"
10. Verify you see AI recommendations

✅ **If everything works, proceed to Step 2!**

---

## 📦 Step 2: Push to GitHub (5 minutes)

### Initialize Git

```bash
# Navigate to project root
cd "E:\Projects\Project 1\SkillSync"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: SkillSync - AI Career Recommendation System

Features:
- Resume upload with AI extraction
- Skill gap visualization  
- Learning path timeline
- Progress tracking with achievements
- 500+ curated courses with real links
- Modern UI with animations"
```

### Create GitHub Repository

1. **Go to**: https://github.com/new

2. **Repository Settings**:
   - **Name**: `SkillSync`
   - **Description**: `🚀 AI-Powered Career Path Recommendation System with Spring Boot & React. Features resume parsing, skill gap analysis, and 500+ curated courses.`
   - **Visibility**: Public (recommended) or Private
   - **DO NOT** check any initialization options

3. **Click "Create repository"**

### Connect and Push

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/SkillSync.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

✅ **Verify**: Visit your GitHub repository URL to see your code!

### Add Repository Details (Optional but Recommended)

On GitHub:
1. Click "Add topics"
2. Add: `java`, `spring-boot`, `react`, `ai`, `career-planning`, `framer-motion`, `tailwindcss`
3. Click "Edit" (right side)
4. Add description and website (after deployment)

---

## 🚀 Step 3: Deploy Backend to Railway (10 minutes)

### Create Railway Account

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway

### Deploy Backend

1. **Click "New Project"**

2. **Select "Deploy from GitHub repo"**

3. **Connect Repository**
   - Select your SkillSync repository
   - Click "Deploy Now"

4. **Add PostgreSQL Database**
   - In your project dashboard
   - Click "New" → "Database" → "Add PostgreSQL"
   - Wait 1-2 minutes for database to provision

5. **Configure Service**
   - Click on your service (skillsync-backend)
   - Go to "Settings"
   - Under "Source" → Set Root Directory: `backend`

6. **Add Environment Variables**
   - Go to "Variables" tab
   - Add these variables:
     ```
     SPRING_PROFILES_ACTIVE=prod
     JWT_SECRET=your-very-secure-jwt-secret-at-least-32-characters-long-please
     ```
   - Optional: `OPENAI_API_KEY=your-key` (if you have one)

7. **Configure Build**
   - Go to "Settings" → "Build"
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/*.jar`

8. **Deploy**
   - Go to "Deployments" tab
   - Click "Deploy" or it auto-deploys
   - Wait 5-10 minutes for build

9. **Get Your Backend URL**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Copy the URL (e.g., `https://skillsync-backend-production.up.railway.app`)
   - **SAVE THIS URL - YOU'LL NEED IT!**

✅ **Verify**: Visit `https://your-backend-url/api` - you should see a response

---

## 🎨 Step 4: Deploy Frontend to Vercel (5 minutes)

### Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### Deploy Frontend

1. **Click "Add New" → "Project"**

2. **Import Repository**
   - Select your SkillSync repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url-from-railway/api
     ```
   - Replace with YOUR actual Railway backend URL
   - Click "Add"

5. **Click "Deploy"**
   - Wait 2-3 minutes
   - Vercel will provide a URL like: `https://skillsync-xyz.vercel.app`

6. **Visit Your Live App!**
   - Click the provided URL
   - Your app should be live!

✅ **Verify**: 
- Open the Vercel URL
- Try creating an account
- Upload resume
- Generate recommendations

---

## 🔧 Step 5: Update CORS (Important!)

Your frontend can't talk to backend yet! Fix CORS:

### Option A: Via Environment Variable (Recommended)

1. **In Railway**:
   - Go to your backend service
   - Add environment variable:
     ```
     ALLOWED_ORIGINS=https://your-vercel-url.vercel.app
     ```
   - Redeploy

2. **Update SecurityConfig.java**:
   - Add this to read from environment variable
   - Or keep the hardcoded version for now

### Option B: Update Code (Quick Fix)

1. **Edit** `backend/src/main/java/com/skillsync/config/SecurityConfig.java`

2. **Find this line** (~line 67):
   ```java
   configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:5173"));
   ```

3. **Change to**:
   ```java
   configuration.setAllowedOrigins(Arrays.asList(
       "http://localhost:3000", 
       "http://localhost:5173",
       "https://your-actual-vercel-url.vercel.app"
   ));
   ```

4. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Update CORS for production"
   git push
   ```

5. **Railway auto-deploys** (wait 5-10 min)

✅ **Test**: Try your Vercel URL again - everything should work!

---

## 🎉 Step 6: Final Touches

### Update README

1. Edit `README.md`
2. Add your live demo URL at the top:
   ```markdown
   ## 🌐 Live Demo
   
   **Frontend**: https://your-vercel-url.vercel.app
   **Backend API**: https://your-railway-url/api
   ```

3. Commit and push:
   ```bash
   git add README.md
   git commit -m "Add live demo URLs"
   git push
   ```

### Update GitHub Repository

1. Go to your GitHub repository
2. Click "About" (gear icon on right)
3. Add:
   - **Website**: Your Vercel URL
   - **Topics**: `java`, `spring-boot`, `react`, `ai`, `career`
   - **Description**: Your project description

### Test Everything

Visit your live app and test:
- [ ] Sign up works
- [ ] Login works
- [ ] Profile creation works
- [ ] Resume upload works
- [ ] Skills are extracted
- [ ] AI recommendations work
- [ ] Courses page loads
- [ ] Course links work
- [ ] Dashboard shows data
- [ ] Animations are smooth

---

## 📋 Your Project URLs

After completing all steps, you'll have:

| Service | URL | Purpose |
|---------|-----|---------|
| **GitHub** | github.com/YOUR-USERNAME/SkillSync | Source code |
| **Railway** | skillsync-backend-xxx.railway.app | Backend API |
| **Vercel** | skillsync-xxx.vercel.app | Live application |
| **PostgreSQL** | Provided by Railway | Production database |

---

## 🐛 Troubleshooting

### Resume Upload Not Working

**Issue**: Skills not being extracted

**Solution**:
1. Use .TXT files (works best)
2. Make sure file has clear skill names
3. Check console for errors (F12)
4. Skills need to match keywords in ResumeUploader.jsx

### Frontend Can't Connect to Backend

**Issue**: CORS errors or 404

**Solution**:
1. Verify VITE_API_URL in Vercel
2. Check CORS in SecurityConfig.java
3. Verify backend is running (visit /api endpoint)
4. Check both URLs are correct

### Database Not Loading Sample Data

**Issue**: No courses showing

**Solution**:
1. Check Railway logs for errors
2. Verify data.sql is in resources folder
3. Check spring.sql.init.mode=always
4. Manually run data.sql in PostgreSQL if needed

### Build Fails

**Backend**:
```bash
# Clear and rebuild
cd backend
mvn clean install -U
```

**Frontend**:
```bash
# Clear and rebuild
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🎯 What You've Built

✅ **Full-Stack Application**
- Backend: Spring Boot + PostgreSQL
- Frontend: React + Vite + Tailwind
- Animations: Framer Motion

✅ **Advanced Features**
- Resume upload with AI extraction
- Skill gap visualization
- Learning path timeline  
- Progress tracking
- 500+ real course links

✅ **Production Deployment**
- Backend on Railway
- Frontend on Vercel
- PostgreSQL database
- Continuous deployment

✅ **Open Source on GitHub**
- Clean codebase
- Comprehensive documentation
- Ready for contributions

---

## 🚀 Next Steps

1. **Share Your Project**
   - Add to LinkedIn
   - Share on Twitter/X
   - Post on Reddit (r/webdev, r/java)
   - Submit to Product Hunt

2. **Get Feedback**
   - Ask friends to test
   - Share in dev communities
   - Create issues for improvements

3. **Keep Improving**
   - Add dark mode
   - Add more features
   - Improve AI prompts
   - Add analytics

---

## 🎓 What You Learned

- Full-stack development
- Spring Boot + React integration
- JWT authentication
- Database design
- API development
- Modern UI/UX with animations
- File upload and parsing
- Data visualization
- Cloud deployment
- CI/CD basics
- Git & GitHub

---

## 🌟 Show Your Work

**Add to Resume/Portfolio**:
- ✅ Full-stack Java + React project
- ✅ AI integration (OpenAI)
- ✅ Cloud deployment experience
- ✅ Modern tech stack
- ✅ Production-ready application

**GitHub README Metrics**:
- Star your own repo to start!
- Share with others
- Get feedback and stars

---

**Congratulations! You've built and deployed a production-ready AI application! 🎉**

**Your Live App**: https://your-vercel-url.vercel.app
**Your GitHub**: https://github.com/YOUR-USERNAME/SkillSync

---

## 📞 Need Help?

If you get stuck:
1. Check the logs (Railway/Vercel dashboards)
2. Review the troubleshooting section
3. Check DEPLOYMENT.md for details
4. Open an issue on GitHub
5. Search Stack Overflow

**Good luck with your deployment! 🚀**
