# Railway PostgreSQL Database Setup Guide

## Current Issue
The application is failing to connect to the PostgreSQL database with a connection timeout error.

## Root Cause
The PostgreSQL database might not be properly configured in your Railway project.

## Step-by-Step Setup Instructions

### 1. Add PostgreSQL to Your Railway Project

1. Go to your Railway project dashboard at https://railway.app
2. Click the **"+ New"** button
3. Select **"Database"**
4. Choose **"Add PostgreSQL"**
5. Railway will automatically provision a PostgreSQL database

### 2. Verify Database Connection

After adding PostgreSQL, Railway automatically creates these environment variables:
- `DATABASE_URL` - Full connection string
- `PGHOST` - Database host
- `PGPORT` - Database port (usually 5432)
- `PGUSER` - Database username
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name

### 3. Link Database to Your Application

1. In Railway dashboard, click on your **backend service**
2. Go to the **"Settings"** tab
3. Scroll to **"Service Variables"** or **"Environment Variables"**
4. Verify that `DATABASE_URL` is present and starts with `postgresql://`

### 4. Check Network Configuration

Railway services in the same project are automatically on the same private network. However, verify:

1. Both your backend service and PostgreSQL database are in the **same Railway project**
2. The database service is running (check status in Railway dashboard)
3. Your backend service has the `DATABASE_URL` environment variable

### 5. Alternative: Manual Database Configuration

If automatic DATABASE_URL parsing doesn't work, you can manually set these environment variables in Railway:

Go to your backend service → Variables → Add the following:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://<PGHOST>:<PGPORT>/<PGDATABASE>
SPRING_DATASOURCE_USERNAME=<PGUSER>
SPRING_DATASOURCE_PASSWORD=<PGPASSWORD>
```

Replace the `<...>` placeholders with values from your PostgreSQL service.

### 6. Redeploy the Application

After verifying the database setup:
1. In Railway dashboard, go to your backend service
2. Click **"Deployments"**
3. Click **"Redeploy"** on the latest deployment
4. Or push a new commit to trigger automatic deployment

### 7. Monitor Deployment Logs

Watch the deployment logs for:

**Success indicators:**
```
Parsing DATABASE_URL for Spring Boot...
Database configuration set:
  URL: jdbc:postgresql://...
  Username: postgres
Active Profile(s): prod
HikariPool-1 - Starting...
HikariPool-1 - Start completed.
SkillSync Application Started Successfully!
```

**Failure indicators:**
```
Connection timeout
Could not obtain connection
HHH000342: Could not obtain connection to query metadata
```

## Common Issues and Solutions

### Issue 1: DATABASE_URL not set
**Symptom:** Application uses default localhost connection
**Solution:** Add PostgreSQL database to Railway project

### Issue 2: Connection refused
**Symptom:** Connection refused errors
**Solution:** Ensure both services are in the same Railway project

### Issue 3: Connection timeout
**Symptom:** Timeout after 30 seconds
**Solution:** 
- Verify database service is running
- Check that database is in the same region
- Restart both services

### Issue 4: Wrong credentials
**Symptom:** Authentication failed
**Solution:** Verify SPRING_DATASOURCE_USERNAME and SPRING_DATASOURCE_PASSWORD match database credentials

## Testing the Connection

Once deployed, test the health endpoint:

```bash
curl https://your-railway-url.railway.app/api/health
```

Expected response:
```json
{
  "status": "UP",
  "timestamp": "2025-10-17T...",
  "service": "SkillSync API"
}
```

## Current Configuration

The application is configured with:
- **Connection pool size:** 5 max, 2 min idle
- **Connection timeout:** 30 seconds
- **Idle timeout:** 10 minutes
- **Max lifetime:** 30 minutes
- **Leak detection:** 60 seconds

These settings are optimized for Railway's environment.

## Next Steps

1. **Add PostgreSQL database** to your Railway project (if not already done)
2. **Verify environment variables** are set correctly
3. **Redeploy** the application
4. **Check logs** for successful connection
5. **Test the API** using the health endpoint

## Support

If you continue to experience issues:
1. Check Railway's status page: https://status.railway.app
2. Review Railway documentation: https://docs.railway.app/databases/postgresql
3. Verify your deployment logs show the database URL being parsed correctly
