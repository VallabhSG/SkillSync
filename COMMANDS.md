# 🛠️ SkillSync - Command Reference

Quick reference for all commands you'll need.

---

## 🚀 Local Development

### Backend

```bash
# Navigate to backend
cd "E:\Projects\Project 1\SkillSync\backend"

# Run application
mvn spring-boot:run

# Build only
mvn clean package

# Build without tests
mvn clean package -DskipTests

# Clean build
mvn clean install

# Update dependencies
mvn clean install -U

# Run specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### Frontend

```bash
# Navigate to frontend
cd "E:\Projects\Project 1\SkillSync\frontend"

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Git Commands

### Initial Setup

```bash
# Navigate to project root
cd "E:\Projects\Project 1\SkillSync"

# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: SkillSync AI Career Recommendation System"

# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/SkillSync.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Daily Workflow

```bash
# Check status
git status

# Add changes
git add .
# or add specific file
git add filename.js

# Commit changes
git commit -m "Your descriptive message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log
git log --oneline
```

### Branching

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout development

# List branches
git branch

# Delete branch
git branch -d feature/old-feature

# Push branch to GitHub
git push -u origin feature/new-feature

# Merge branch
git checkout main
git merge feature/new-feature
```

### Undo Changes

```bash
# Discard changes in file
git checkout -- filename.js

# Unstage file
git reset HEAD filename.js

# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# View changes
git diff
git diff filename.js
```

---

## 🚢 Deployment Commands

### Railway

```bash
# Install Railway CLI (optional)
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Open in browser
railway open
```

### Vercel

```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

### Netlify

```bash
# Install Netlify CLI (optional)
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod

# View logs
netlify logs

# Open in browser
netlify open
```

---

## 🗄️ Database Commands

### H2 Console (Development)

Access at: http://localhost:8080/h2-console

```
JDBC URL: jdbc:h2:mem:skillsyncdb
Username: sa
Password: (leave empty)
```

### PostgreSQL (Production)

```bash
# Connect to database (if you have psql installed)
psql postgresql://user:password@host:5432/dbname

# List tables
\dt

# View table structure
\d table_name

# Run query
SELECT * FROM users;

# Exit
\q
```

### Common SQL Queries

```sql
-- View all users
SELECT * FROM users;

-- View all profiles
SELECT * FROM user_profiles;

-- View recommendations
SELECT * FROM career_recommendations;

-- View courses
SELECT * FROM courses;

-- Count records
SELECT COUNT(*) FROM users;

-- Delete all recommendations (careful!)
DELETE FROM career_recommendations;

-- Reset database (DANGEROUS!)
DROP TABLE IF EXISTS users CASCADE;
```

---

## 🔍 Debugging Commands

### View Logs

```bash
# Backend logs (while running)
# Watch the console where mvn spring-boot:run is running

# Frontend logs (while running)
# Watch the console where npm run dev is running

# Railway logs
railway logs

# Vercel logs
vercel logs

# Check logs in browser
# Press F12 → Console tab
```

### Check Ports

```bash
# Windows
netstat -ano | findstr :8080
netstat -ano | findstr :3000

# Mac/Linux
lsof -ti:8080
lsof -ti:3000

# Kill process
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Environment Variables

```bash
# Windows (PowerShell)
$env:VARIABLE_NAME="value"

# Windows (CMD)
set VARIABLE_NAME=value

# Mac/Linux
export VARIABLE_NAME=value

# Check environment variable
# Windows
echo $env:VARIABLE_NAME

# Mac/Linux
echo $VARIABLE_NAME

# List all environment variables
# Windows
Get-ChildItem Env:

# Mac/Linux
printenv
```

---

## 📊 Testing Commands

### Backend Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=UserServiceTest

# Run with coverage
mvn test jacoco:report

# Skip tests
mvn package -DskipTests
```

### Frontend Tests

```bash
# Run tests (if configured)
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

---

## 🔧 Build Commands

### Production Build

```bash
# Backend
cd backend
mvn clean package -DskipTests
# Output: target/skillsync-backend-1.0.0.jar

# Frontend
cd frontend
npm run build
# Output: dist/

# Run production JAR locally
java -jar target/skillsync-backend-1.0.0.jar

# Run production frontend locally
npm run preview
```

### Docker (if you add Docker support)

```bash
# Build image
docker build -t skillsync-backend ./backend
docker build -t skillsync-frontend ./frontend

# Run container
docker run -p 8080:8080 skillsync-backend
docker run -p 3000:3000 skillsync-frontend

# View logs
docker logs container-name

# Stop container
docker stop container-name
```

---

## 📝 Documentation Commands

### Generate Documentation

```bash
# Backend (JavaDoc)
cd backend
mvn javadoc:javadoc
# Output: target/site/apidocs/

# Frontend (if configured)
cd frontend
npm run docs
```

---

## 🔄 Update Commands

### Update Dependencies

```bash
# Backend - Update to latest versions
mvn versions:display-dependency-updates
mvn versions:use-latest-versions

# Frontend - Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest

# Update package.json
npx npm-check-updates -u
npm install
```

---

## 🧹 Cleanup Commands

```bash
# Clean Backend
cd backend
mvn clean

# Clean Frontend
cd frontend
rm -rf node_modules
rm -rf dist
rm package-lock.json

# Clean Git
git clean -fd
git clean -fdx  # Remove ignored files too (careful!)

# Clear npm cache
npm cache clean --force
```

---

## 📋 Quick Command Combos

### Fresh Start

```bash
# Complete fresh start
cd "E:\Projects\Project 1\SkillSync"

# Backend
cd backend
mvn clean install
mvn spring-boot:run

# Frontend (new terminal)
cd frontend
rm -rf node_modules
npm install
npm run dev
```

### Deploy Everything

```bash
# Commit and push
git add .
git commit -m "Deploy updates"
git push

# Railway and Vercel auto-deploy!
```

### Reset Everything

```bash
# Backend
cd backend
mvn clean

# Frontend
cd frontend
rm -rf node_modules dist

# Git (careful!)
git reset --hard HEAD
git clean -fd
```

---

## 🎯 Most Used Commands

### Development
```bash
mvn spring-boot:run          # Start backend
npm run dev                   # Start frontend
git status                    # Check changes
git add .                     # Stage changes
git commit -m "message"       # Commit
git push                      # Push to GitHub
```

### Troubleshooting
```bash
mvn clean install -U          # Backend issues
rm -rf node_modules && npm install  # Frontend issues
git pull                      # Sync with GitHub
railway logs                  # Check backend logs
vercel logs                   # Check frontend logs
```

---

## 💡 Pro Tips

```bash
# Create aliases (Windows PowerShell)
Set-Alias -Name backend -Value "cd 'E:\Projects\Project 1\SkillSync\backend'; mvn spring-boot:run"
Set-Alias -Name frontend -Value "cd 'E:\Projects\Project 1\SkillSync\frontend'; npm run dev"

# Create aliases (Mac/Linux)
alias backend="cd ~/SkillSync/backend && mvn spring-boot:run"
alias frontend="cd ~/SkillSync/frontend && npm run dev"

# Quick commit
alias commit="git add . && git commit -m"
# Usage: commit "Your message"

# Quick push
alias push="git push"
```

---

**Keep this file handy for quick reference! 📌**
