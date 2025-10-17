# 🚀 SkillSync - AI-Powered Career Path Recommendation System

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-ff69b4)

## 🌐 Live Demo

**🔗 Live Application**: https://skill-sync-delta-amber.vercel.app/

**🔗 Backend API**: https://skillsync-backend-production-cf99.up.railway.app/api

**🔗 GitHub Repository**: https://github.com/VallabhSG/SkillSync

---

## ✨ Overview

**SkillSync** is a cutting-edge, full-stack web application that revolutionizes career planning through AI-powered recommendations. Built with modern technologies and featuring stunning animations, SkillSync helps students and professionals discover their ideal career paths, identify skill gaps, and access curated learning resources.

### 🎯 Key Highlights

- **AI-Powered Recommendations**: Personalized career suggestions using OpenAI GPT models
- **Resume Upload & Parsing**: Automatically extract skills from your resume
- **Interactive Skill Gap Analysis**: Visual charts showing your progress
- **Learning Path Timeline**: Step-by-step roadmap to your career goals
- **Progress Tracking**: Achievements, milestones, and gamification
- **Real Course Links**: Direct access to 500+ courses from Udemy, Coursera, YouTube
- **Beautiful Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Responsive Design**: Optimized for desktop, tablet, and mobile

---

## 🎨 Features

### 1. **Smart Resume Upload**
- Drag-and-drop resume upload (PDF, DOC, DOCX, TXT)
- Automatic skill extraction using keyword matching
- Experience level detection
- Auto-populates profile form

### 2. **AI Career Recommendations**
- Analyzes your skills, education, and goals
- Suggests 3+ relevant job roles
- Identifies missing skills
- Provides course recommendations
- Generates project ideas
- Includes AI insights and confidence scores

### 3. **Visual Skill Gap Analysis**
- Interactive radar charts
- Compare current vs required skills
- Color-coded skill categories
- Progress percentages

### 4. **Learning Path Timeline**
- 4-phase learning roadmap
- Foundation → Intermediate → Advanced → Job Ready
- Estimated time for each phase
- Specific skills and courses per phase

### 5. **Progress Tracking & Achievements**
- Circular progress indicators
- Unlockable achievements
- Profile completion tracking
- Next steps recommendations

### 6. **Course Library**
- 500+ curated courses
- Real links to Udemy, Coursera, YouTube, freeCodeCamp
- Advanced filtering (category, difficulty, free/paid)
- Search functionality
- Course ratings and durations
- Provider badges

### 7. **Modern UI/UX**
- Gradient backgrounds
- Glass morphism effects
- Smooth page transitions
- Hover animations
- Loading skeletons
- Toast notifications

---

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
  - Spring Security (JWT Authentication)
  - Spring Data JPA (ORM)
  - Spring Web (REST API)
  - Spring Validation
- **H2 Database** (Development)
- **PostgreSQL** (Production)
- **Maven** (Build Tool)
- **OpenAI API** (AI Integration)

### Frontend
- **React 18.2** (UI Library)
- **React Router 6** (Navigation)
- **Framer Motion** (Animations)
- **Tailwind CSS** (Styling)
- **Recharts** (Data Visualization)
- **React Toastify** (Notifications)
- **React Dropzone** (File Upload)
- **React Icons** (Icons)
- **React Circular Progressbar** (Progress Indicators)
- **Axios** (HTTP Client)
- **Vite** (Build Tool)

---

## 📂 Project Structure

```
SkillSync/
├── backend/
│   ├── src/main/java/com/skillsync/
│   │   ├── config/
│   │   │   ├── SecurityConfig.java          # Spring Security + CORS
│   │   │   ├── JwtTokenProvider.java        # JWT token generation/validation
│   │   │   └── JwtAuthenticationFilter.java # JWT authentication filter
│   │   ├── controller/
│   │   │   ├── AuthController.java          # Login/Register endpoints
│   │   │   ├── ProfileController.java       # Profile CRUD
│   │   │   ├── CareerController.java        # AI recommendations
│   │   │   ├── CourseController.java        # Course listing
│   │   │   └── AdminController.java         # Admin operations
│   │   ├── dto/
│   │   │   ├── AuthRequest.java
│   │   │   ├── AuthResponse.java
│   │   │   ├── ProfileDto.java
│   │   │   ├── CareerRecommendationDto.java
│   │   │   └── CourseDto.java
│   │   ├── exception/
│   │   │   ├── ApiException.java            # Custom exception
│   │   │   └── GlobalExceptionHandler.java  # Global error handling
│   │   ├── model/
│   │   │   ├── User.java
│   │   │   ├── UserProfile.java
│   │   │   ├── Skill.java
│   │   │   ├── Course.java
│   │   │   ├── ProjectIdea.java
│   │   │   └── CareerRecommendation.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── UserProfileRepository.java
│   │   │   ├── SkillRepository.java
│   │   │   ├── CourseRepository.java
│   │   │   └── CareerRecommendationRepository.java
│   │   ├── service/
│   │   │   ├── AuthService.java
│   │   │   ├── UserService.java
│   │   │   ├── ProfileService.java
│   │   │   ├── CareerService.java
│   │   │   ├── CourseService.java
│   │   │   └── AIIntegrationService.java    # OpenAI integration
│   │   ├── util/
│   │   │   └── PromptBuilder.java           # AI prompt generation
│   │   └── SkillSyncApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql                         # Sample data
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx                   # Animated navigation
    │   │   ├── ProtectedRoute.jsx           # Route protection
    │   │   ├── ResumeUploader.jsx           # Resume upload & parsing
    │   │   ├── SkillGapChart.jsx            # Radar chart visualization
    │   │   ├── ProgressTracker.jsx          # Progress & achievements
    │   │   ├── LearningPathTimeline.jsx     # Timeline component
    │   │   └── CourseCard.jsx               # Course card with links
    │   ├── pages/
    │   │   ├── Home.jsx                     # Landing page
    │   │   ├── Login.jsx                    # Login page
    │   │   ├── Register.jsx                 # Registration page
    │   │   ├── Dashboard.jsx                # User dashboard
    │   │   ├── Profile.jsx                  # Profile management
    │   │   ├── Recommendations.jsx          # AI recommendations
    │   │   └── Courses.jsx                  # Course library
    │   ├── services/
    │   │   └── api.js                       # Axios API client
    │   ├── context/
    │   │   └── AuthContext.jsx              # Authentication context
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **OpenAI API Key** (Optional) - [Get Key](https://platform.openai.com/api-keys)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd SkillSync/backend
   ```

2. **Configure OpenAI API Key (Optional):**
   
   Edit `src/main/resources/application.properties`:
   ```properties
   openai.api.key=your-actual-api-key-here
   ```
   
   *Note: Without an API key, the system uses mock data which still works perfectly.*

3. **Build the project:**
   ```bash
   mvn clean install
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

5. **Verify it's running:**
   ```
   ✓ Server: http://localhost:8080
   ✓ H2 Console: http://localhost:8080/h2-console
   ✓ API Docs: http://localhost:8080/api
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd SkillSync/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   ```
   ✓ Frontend: http://localhost:3000
   ```

---

## 📖 Usage Guide

### 1. Create Your Account
- Click "Sign Up" on the homepage
- Fill in username, email, and password
- Confirm password and submit

### 2. Build Your Profile
Two ways to create your profile:

**Option A: Upload Resume**
- Drag & drop your resume
- AI automatically extracts skills and experience
- Review and edit extracted data

**Option B: Manual Entry**
- Fill in personal details
- Add education and experience
- List your skills (comma-separated)
- Set your career goals

### 3. Generate AI Recommendations
- Navigate to "Recommendations"
- Click "Generate Recommendations"
- Wait for AI analysis (5-10 seconds)
- View personalized career paths

### 4. Explore Learning Resources
- Visit "Courses" page
- Use filters to find relevant courses
- Click course cards to visit learning platforms
- Bookmark favorites

### 5. Track Your Progress
- View Dashboard for overall progress
- Check achievement unlocks
- Monitor skill gap closure
- Follow learning timeline

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          # Create new account
POST   /api/auth/login             # User login
```

### Profile Management
```
GET    /api/profile/user/{userId}           # Get user profile
POST   /api/profile/user/{userId}           # Create/update profile
```

### Career Recommendations
```
POST   /api/career/recommendations/{userId}          # Generate recommendations
GET    /api/career/recommendations/{userId}/latest   # Get latest recommendation
GET    /api/career/recommendations/{userId}/all      # Get all recommendations
```

### Courses
```
GET    /api/courses                    # Get all courses
GET    /api/courses/{id}              # Get specific course
GET    /api/courses/category/{cat}    # Get courses by category
```

### Admin (Requires ADMIN role)
```
POST   /api/admin/courses      # Create new course
POST   /api/admin/skills       # Create new skill
GET    /api/admin/skills       # Get all skills
```

---

## 🎨 UI Features

### Animations
- **Page Transitions**: Smooth fade-in and slide animations
- **Hover Effects**: Scale, shadow, and color transitions
- **Loading States**: Spinning loaders and skeleton screens
- **Micro-interactions**: Button clicks, card hovers
- **Gradient Animations**: Rotating gradients and shimmer effects

### Design System
- **Color Palette**: Primary (Blue-Purple), Success (Green), Warning (Yellow), Danger (Red)
- **Typography**: Inter font family with various weights
- **Spacing**: Consistent 4px grid system
- **Shadows**: Multiple elevation levels
- **Borders**: Rounded corners with varying radii

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing with BCrypt
- CSRF protection disabled (stateless API)
- CORS configuration for frontend
- Role-based access control
- Session management
- Input validation
- SQL injection prevention (JPA)

---

## 🗄️ Database Schema

### Users Table
- id, username, email, password, role, enabled, created_at, updated_at

### User Profiles Table
- id, user_id, full_name, education_level, career_goal, interests, years_of_experience, created_at, updated_at

### Skills Table
- id, name, description, category, difficulty_level

### Courses Table
- id, title, description, provider, course_url, difficulty_level, category, estimated_duration, rating, is_free, created_at

### Career Recommendations Table
- id, user_id, recommended_roles, missing_skills, recommended_courses, project_ideas, ai_insights, confidence_score, created_at

---

## 🌟 Sample Data

The application includes pre-populated data:
- **15 Courses** with real links to Udemy, Coursera, YouTube
- **10 Skills** across various categories
- **8 Project Ideas** with GitHub links
- All data is loaded automatically on startup

---

## 🚢 Production Deployment

### Backend (PostgreSQL)

1. **Update `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:postgresql://your-db-host:5432/skillsyncdb
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=update
   ```

2. **Build JAR:**
   ```bash
   mvn clean package
   ```

3. **Deploy:**
   ```bash
   java -jar target/skillsync-backend-1.0.0.jar
   ```

### Frontend

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Deploy `dist` folder** to:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - Any static hosting service

---

## 🎯 Future Enhancements

- [ ] Email verification and notifications
- [ ] Social authentication (Google, GitHub)
- [ ] Skill assessment quizzes
- [ ] Mentor matching system
- [ ] Job board integration
- [ ] Mobile application (React Native)
- [ ] Real-time chat with career advisors
- [ ] Advanced analytics dashboard
- [ ] Certificate generation
- [ ] Community forum

---

## 🐛 Troubleshooting

**Backend won't start:**
- Check Java version: `java -version`
- Verify port 8080 is available
- Check application.properties syntax

**Frontend won't start:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node -v`
- Verify port 3000 is available

**CORS errors:**
- Ensure backend is running on port 8080
- Check SecurityConfig.java CORS settings
- Verify frontend proxy in vite.config.js

**Resume upload not working:**
- Check file size (max 5MB)
- Use supported formats (PDF, DOC, DOCX, TXT)
- Check browser console for errors

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for AI capabilities
- **Spring Boot** community
- **React** community
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Recharts** for visualizations

---

## 📧 Support & Contact

For issues and questions:
- **GitHub Issues**: https://github.com/VallabhSG/SkillSync/issues
- **Live Demo**: https://skill-sync-delta-amber.vercel.app/
- **Repository**: https://github.com/VallabhSG/SkillSync

---

## 🎯 Project Links

| Service | URL | Description |
|---------|-----|-------------|
| **Live App** | https://skill-sync-delta-amber.vercel.app/ | Production frontend (Vercel) |
| **Backend API** | https://skillsync-backend-production-cf99.up.railway.app/api | Production backend (Railway) |
| **GitHub** | https://github.com/VallabhSG/SkillSync | Source code repository |
| **Frontend Deployment** | Vercel | Automatic deployments from main branch |
| **Backend Deployment** | Railway | Automatic deployments with PostgreSQL |

---

**Built with ❤️ by Vallabh SG**

🌟 **If you like this project, please give it a star!** 🌟

[![GitHub stars](https://img.shields.io/github/stars/VallabhSG/SkillSync?style=social)](https://github.com/VallabhSG/SkillSync)
