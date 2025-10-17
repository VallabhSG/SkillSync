#!/bin/bash

# Parse DATABASE_URL from Railway and convert to Spring Boot format
# DATABASE_URL format: postgresql://user:password@host:port/database
# We need to extract: jdbc:postgresql://host:port/database, username, password

if [ -n "$DATABASE_URL" ]; then
    echo "Parsing DATABASE_URL for Spring Boot..."

    # Remove postgresql:// prefix
    DB_URL_NO_PREFIX="${DATABASE_URL#postgresql://}"

    # Extract username (everything before first colon)
    DB_USER="${DB_URL_NO_PREFIX%%:*}"

    # Remove username and colon, get rest
    TEMP="${DB_URL_NO_PREFIX#*:}"

    # Extract password (everything before @)
    DB_PASS="${TEMP%%@*}"

    # Extract host:port/database (everything after @)
    DB_HOST_PORT_DB="${TEMP#*@}"

    # Construct JDBC URL
    export SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST_PORT_DB}"
    export SPRING_DATASOURCE_USERNAME="${DB_USER}"
    export SPRING_DATASOURCE_PASSWORD="${DB_PASS}"

    echo "Database configuration set:"
    echo "  URL: ${SPRING_DATASOURCE_URL}"
    echo "  Username: ${SPRING_DATASOURCE_USERNAME}"
    echo "  Password: [HIDDEN]"
else
    echo "DATABASE_URL not set, using default configuration from application-prod.properties"
fi

# Start the application
exec java -Dserver.port=$PORT -jar target/*.jar
