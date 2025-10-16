# Railway Deployment - Complete Fix Guide

## Issues Fixed

### 1. Spring Profile Activation Issue
**Problem**: Application was running with `default` profile instead of `prod` profile, causing it to use H2 in-memory database instead of PostgreSQL.

**Solution**: Changed from JVM system property to environment variable in `railway.toml`:

```toml
[deploy.environmentVariables]
SPRING_PROFILES_ACTIVE = "prod"
```

### 2. Health Check Endpoint 403 Error
**Problem**: Spring Security was blocking `/api/health` endpoint with 403 Forbidden.

**Solution**: Already fixed in `SecurityConfig.java` - health endpoints are whitelisted:
```java
.requestMatchers("/api/health").permitAll()
.requestMatchers("/actuator/health/**").permitAll()
```

### 3. Enhanced Startup Logging
**Problem**: Difficult to verify which profile is active during deployment.

**Solution**: Updated `SkillSyncApplication.java` to log active profile on startup:
```java
System.out.println("✓ Active Profile(s): " + profileInfo);
```

## Deployment Steps for Railway

### Step 1: Create New Project in Railway
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your SkillSync repository

### Step 2: Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable

### Step 3: Configure Environment Variables
Railway will automatically set:
- `DATABASE_URL` - PostgreSQL connection string (auto-created)
- `PORT` - Server port (auto-assigned)

The `railway.toml` file will automatically set:
- `SPRING_PROFILES_ACTIVE=prod` - Activates production profile

**Optional**: Add JWT secret if not using default:
- `JWT_SECRET` - Your JWT signing key

### Step 4: Deploy
1. Railway will automatically detect `railway.toml` and `nixpacks.toml`
2. Build process will execute: `cd backend && mvn clean package -DskipTests`
3. Start command will execute: `cd backend && java -Dserver.port=$PORT -jar target/*.jar`
4. Health checks will ping: `http://your-app.railway.app/api/health`

### Step 5: Verify Deployment
Check the deployment logs for:
```
✓ SkillSync Application Started Successfully!
✓ Active Profile(s): prod
✓ Server running on port: [Railway assigned port]
✓ Health Check: http://localhost:[port]/api/health
```

### Step 6: Test Endpoints
```bash
# Health check
curl https://your-app.railway.app/api/health

# Expected response:
{
  "status": "UP",
  "timestamp": "2025-01-15T12:34:56",
  "service": "SkillSync API"
}
```

## Configuration Files

### railway.toml
```toml
[build]
builder = "nixpacks"
buildCommand = "cd backend && mvn clean package -DskipTests"

[deploy]
startCommand = "cd backend && java -Dserver.port=$PORT -jar target/*.jar"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3

[deploy.environmentVariables]
SPRING_PROFILES_ACTIVE = "prod"
```

### nixpacks.toml
```toml
[phases.setup]
nixPkgs = ["maven", "jdk17"]

[phases.build]
cmds = ["cd backend && mvn clean package -DskipTests"]

[start]
cmd = "cd backend && java -Dserver.port=$PORT -jar target/*.jar"
```

### application-prod.properties
```properties
# Database Configuration
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/skillsyncdb}
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# Server Configuration
server.port=${PORT:8080}
server.error.include-message=always

# JWT Configuration
jwt.secret=${JWT_SECRET:your-secret-key-here-change-in-production}
jwt.expiration=86400000

# Actuator Configuration
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=always
management.health.db.enabled=true

# CORS Configuration
cors.allowed.origins=https://your-frontend-domain.vercel.app,http://localhost:3000
```

## Troubleshooting

### Issue: "No active profile set, falling back to default"
**Cause**: `SPRING_PROFILES_ACTIVE` environment variable not set correctly.

**Fix**: 
- Check Railway dashboard → Your Service → Variables
- Ensure `SPRING_PROFILES_ACTIVE=prod` is present
- Redeploy the service

### Issue: Health check returns 403 Forbidden
**Cause**: Spring Security blocking the endpoint.

**Fix**: Already fixed in codebase. Ensure you've pushed latest `SecurityConfig.java` changes.

### Issue: Application connects to H2 instead of PostgreSQL
**Cause**: Default profile being used instead of prod profile.

**Fix**: Verify `SPRING_PROFILES_ACTIVE=prod` environment variable is set in Railway.

### Issue: Database connection refused
**Cause**: `DATABASE_URL` not properly configured.

**Fix**: 
- Verify PostgreSQL database is added to Railway project
- Check that `DATABASE_URL` variable exists in Railway dashboard
- Format should be: `postgresql://user:password@host:port/database`

## Next Steps

1. **Commit and Push Changes**:
   ```bash
   git add .
   git commit -m "Fix Railway deployment: profile activation and health checks"
   git push origin main
   ```

2. **Monitor Deployment**:
   - Watch Railway build logs for "BUILD SUCCESS"
   - Check deployment logs for "Active Profile(s): prod"
   - Verify health check passes

3. **Deploy Frontend**:
   - Deploy React frontend to Vercel/Netlify
   - Update CORS allowed origins in `application-prod.properties`
   - Set `VITE_API_URL` environment variable to Railway backend URL

## Support

If you encounter issues:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Test health endpoint: `curl https://your-app.railway.app/api/health`
4. Check database connection in logs
