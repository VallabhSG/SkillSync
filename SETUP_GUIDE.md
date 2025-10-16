# SkillSync - Quick Setup Guide

This guide will help you get SkillSync up and running on your local machine in minutes.

## Step-by-Step Setup

### 1. Prerequisites Check

Make sure you have installed:
- ✅ Java 17 or higher (`java -version`)
- ✅ Node.js 18 or higher (`node -v`)
- ✅ Maven 3.6+ (`mvn -v`)

### 2. Backend Setup (5 minutes)

```bash
# Navigate to backend directory
cd SkillSync/backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**Expected Output:**
```
✓ SkillSync Application Started Successfully!
✓ Server running on: http://localhost:8080
✓ H2 Console: http://localhost:8080/h2-console
✓ API Base URL: http://localhost:8080/api
```

### 3. Frontend Setup (3 minutes)

Open a new terminal:

```bash
# Navigate to frontend directory
cd SkillSync/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **H2 Database Console**: http://localhost:8080/h2-console

### 5. Create Your First Account

1. Click "Sign Up" on the homepage
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign up"

### 6. Complete Your Profile

1. After registration, you'll be redirected to the Profile page
2. Fill in your details:
   - Full Name: Your name
   - Education Level: Select from dropdown
   - Years of Experience: Enter a number
   - Career Goal: e.g., "Become a Full Stack Developer"
   - Interests: e.g., "Web Development, AI, Cloud Computing"
   - Skills: e.g., "Java, Python, SQL, HTML, CSS"
3. Click "Save Profile"

### 7. Generate Career Recommendations

1. Navigate to "Recommendations" from the navbar
2. Click "Generate Recommendations"
3. Wait a few seconds for AI to analyze your profile
4. View your personalized career recommendations!

## Testing with Sample Data

### Using H2 Console

1. Navigate to http://localhost:8080/h2-console
2. Use these credentials:
   - JDBC URL: `jdbc:h2:mem:skillsyncdb`
   - Username: `sa`
   - Password: (leave empty)
3. Click "Connect"

### Sample SQL Queries

```sql
-- View all users
SELECT * FROM USERS;

-- View all profiles
SELECT * FROM USER_PROFILES;

-- View all recommendations
SELECT * FROM CAREER_RECOMMENDATIONS;

-- View all skills
SELECT * FROM SKILLS;
```

## Configuring OpenAI (Optional)

To use real AI recommendations instead of mock data:

1. Get an OpenAI API key from https://platform.openai.com/api-keys
2. Edit `backend/src/main/resources/application.properties`:
   ```properties
   openai.api.key=sk-your-actual-api-key-here
   ```
3. Restart the backend server

## Common Issues & Solutions

### Issue: Port 8080 already in use

**Solution:**
```bash
# On Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:8080 | xargs kill -9
```

Or change the port in `application.properties`:
```properties
server.port=8081
```

### Issue: Port 3000 already in use

**Solution:**
Edit `vite.config.js`:
```javascript
server: {
  port: 3001,
  // ...
}
```

### Issue: CORS errors

**Solution:**
Make sure the backend CORS configuration includes your frontend URL in `SecurityConfig.java`.

### Issue: Database errors on startup

**Solution:**
Delete the H2 database and restart:
```properties
spring.jpa.hibernate.ddl-auto=create-drop
```

## Development Tips

### Hot Reload

- **Backend**: Use Spring Boot DevTools (already included)
- **Frontend**: Vite automatically reloads on file changes

### Testing API with Postman/Insomnia

1. **Register a user:**
   ```
   POST http://localhost:8080/api/auth/register
   Body: {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

2. **Login:**
   ```
   POST http://localhost:8080/api/auth/login
   Body: {
     "username": "testuser",
     "password": "password123"
   }
   ```

3. **Use the token in subsequent requests:**
   ```
   Header: Authorization: Bearer <your-token-here>
   ```

### Viewing Logs

- **Backend logs**: Check the terminal where you ran `mvn spring-boot:run`
- **Frontend logs**: Check browser console (F12)

## Production Build

### Backend JAR

```bash
cd backend
mvn clean package
java -jar target/skillsync-backend-1.0.0.jar
```

### Frontend Production Build

```bash
cd frontend
npm run build
# Output will be in the 'dist' folder
```

## Next Steps

1. ✅ Explore the Dashboard
2. ✅ Generate multiple recommendations
3. ✅ Browse courses
4. ✅ Update your profile with new skills
5. ✅ Regenerate recommendations to see changes

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments
- Check application logs for errors
- Ensure all prerequisites are correctly installed

---

Happy coding with SkillSync! 🚀
