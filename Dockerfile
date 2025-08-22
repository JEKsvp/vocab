# Build stage
FROM eclipse-temurin:21-jdk as builder

# Install Node.js for frontend build
RUN apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy Gradle wrapper and build files
COPY gradlew gradlew.bat build.gradle settings.gradle ./
COPY gradle ./gradle

# Fix line endings and make gradlew executable
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew

# Copy source code
COPY src ./src
COPY client ./client

# Build the application (includes frontend build via processResources)
RUN bash ./gradlew clean bootJar --no-daemon

# Runtime stage
FROM eclipse-temurin:21-jre

VOLUME /tmp

# Copy the built JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dserver.port=8080 -jar /app.jar"]