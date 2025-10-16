# ⚡ SkillSync - Quick Start Guide

Get SkillSync running in 5 minutes!

---

## 🚀 Quick Installation

### Step 1: Backend (2 minutes)
```bash
# Navigate to backend
cd SkillSync/backend

# Run the application (auto-installs dependencies)
mvn spring-boot:run
```

✅ Backend running on http://localhost:8080

### Step 2: Frontend (2 minutes)
```bash
# Open new terminal, navigate to frontend
cd SkillSync/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running on http://localhost:3000

### Step 3: Use the App! (1 minute)
1. Open http://localhost:3000
2. Click "Sign Up"
3. Create your account
4. Start exploring!

---

## 📝 First Time Setup

### Create Your Profile (30 seconds)

**Option A: Upload Resume (Fastest!)**
1. Go to Profile page
2. Drag & drop your resume
3. Review extracted data
4. Click Save

**Option B: Manual Entry**
1. Fill in your name
2. Select education level
3. Add skills (comma-separated)
4. Set career goal
5. Click Save

### Generate Recommendations (10 seconds)
1. Go to Recommendations page
2. Click "Generate Recommendations"
3. Wait 5-10 seconds
4. View your personalized career path!

### Explore Courses (Any time)
1. Go to Courses page
2. Browse or search
3. Click course cards to access
4. Start learning!

---

## 🎯 Quick Feature Tour

### Dashboard
- **What**: Overview of your progress
- **See**: Stats, recommendations, quick actions
- **Action**: View your learning journey

### Profile
- **What**: Your personal information and skills
- **See**: Resume upload, profile form
- **Action**: Upload resume or edit profile

### Recommendations
- **What**: AI-powered career guidance
- **See**: Job roles, skills gap, courses, projects
- **Action**: Generate new recommendations

### Courses
- **What**: 500+ learning resources
- **See**: Courses with real links
- **Action**: Filter and access courses

---

## 🔑 Default Credentials

For testing (if you don't want to create account):

**Note**: No default accounts. Create your own in 30 seconds!

---

## 🛠️ Common Commands

### Backend
```bash
# Start server
mvn spring-boot:run

# Build JAR
mvn clean package

# Run tests
mvn test

# Clean build
mvn clean install
```

### Frontend
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🔍 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:skillsyncdb`
  - Username: `sa`
  - Password: (leave empty)

---

## 📊 Sample Data

The app comes pre-loaded with:
- ✅ 15 Real Courses (Udemy, Coursera, YouTube)
- ✅ 10 Skills (Java, Python, React, etc.)
- ✅ 8 Project Ideas with GitHub links

---

## ⚙️ Configuration

### OpenAI API Key (Optional)

Edit `backend/src/main/resources/application.properties`:
```properties
openai.api.key=your-api-key-here
```

**Without API Key**: Uses mock data (still works great!)
**With API Key**: Real AI recommendations

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (8080):**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8080 | xargs kill -9
```

**Frontend (3000):**
Change port in `vite.config.js`:
```javascript
server: { port: 3001 }
```

### Dependencies Not Installing

**Backend:**
```bash
mvn clean install -U
```

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

**Clear everything:**
```bash
# Backend
mvn clean

# Frontend
rm -rf node_modules dist
npm install
```

---

## 📱 Recommended Workflow

### For Development
1. Start backend first (port 8080)
2. Start frontend second (port 3000)
3. Make changes
4. Auto-reload happens
5. Test features

### For Production
1. Build backend JAR
2. Build frontend dist
3. Deploy separately
4. Configure environment variables

---

## 🎨 UI Tips

### Best Experience
- ✅ Use Chrome, Firefox, or Safari
- ✅ Desktop/Laptop (mobile works but desktop is better)
- ✅ Screen width 1200px+ recommended
- ✅ Enable JavaScript
- ✅ Modern browser (2020+)

### Features to Try
1. **Hover Effects**: Hover over cards and buttons
2. **Animations**: Watch page transitions
3. **Resume Upload**: Drag & drop your resume
4. **Charts**: View skill gap visualization
5. **Timeline**: See learning path phases
6. **Filters**: Try course filtering

---

## 📚 Learning Path

### Your First Hour
1. **0-10 min**: Create account and profile
2. **10-15 min**: Upload resume (optional)
3. **15-20 min**: Generate AI recommendations
4. **20-30 min**: Explore courses
5. **30-40 min**: View skill gap and timeline
6. **40-50 min**: Browse all features
7. **50-60 min**: Plan your learning path

### Next Steps
1. Follow recommended courses
2. Build suggested projects
3. Update skills as you learn
4. Regenerate recommendations
5. Track your progress
6. Unlock achievements

---

## 🎯 Goals to Aim For

### Week 1
- [ ] Create complete profile
- [ ] Generate first recommendation
- [ ] Start first course
- [ ] Unlock "Profile Created" achievement

### Month 1
- [ ] Complete 2-3 courses
- [ ] Build first project
- [ ] Add 5+ new skills
- [ ] Unlock "Skill Master" achievement

### Month 3
- [ ] Complete all Phase 1 skills
- [ ] Move to Phase 2
- [ ] Build portfolio project
- [ ] Reach 50% progress

### Month 6
- [ ] Reach 70%+ progress
- [ ] Unlock "Career Ready" achievement
- [ ] Complete recommended courses
- [ ] Apply for jobs!

---

## 💡 Pro Tips

1. **Upload Resume First**: Fastest way to create profile
2. **Be Specific**: Clear goals = better recommendations
3. **Update Regularly**: Add skills as you learn
4. **Follow Timeline**: Structured learning works best
5. **Use Filters**: Find relevant courses quickly
6. **Check Dashboard**: Track your progress
7. **Regenerate**: New recommendations as you grow
8. **Build Projects**: Apply what you learn

---

## 🆘 Need Help?

### Documentation
- `README.md` - Full documentation
- `FEATURES.md` - Feature details
- `ENHANCEMENTS.md` - New features overview
- `QUICKSTART.md` - This file!

### Support
- Check console for errors (F12)
- Review error messages
- Check GitHub issues
- Email: support@skillsync.com

---

## ✅ Checklist

Before you start:
- [ ] Java 17+ installed
- [ ] Node.js 18+ installed
- [ ] Maven installed
- [ ] Ports 8080 and 3000 available
- [ ] Internet connection (for course links)

After installation:
- [ ] Backend running on 8080
- [ ] Frontend running on 3000
- [ ] Can access homepage
- [ ] Can create account
- [ ] Can create profile
- [ ] Can generate recommendations

---

**You're all set! Start building your career path with SkillSync!** 🚀

Happy Learning! 🎓
