#!/bin/bash

echo "🔧 Cleaning up the project..."

# Keep only required folders and files
find . -mindepth 1 -maxdepth 1 ! -name 'frontend' ! -name 'user-service' ! -name 'setup-user-frontend.sh' -exec rm -rf {} +

echo "✅ Removed unused files and folders."

echo "📝 Writing Dockerfile for user-service..."

# Write Dockerfile for user-service
cat <<'EOF' > user-service/Dockerfile
# ---- Build Stage ----
FROM maven:3.8.5-openjdk-8 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# ---- Run Stage ----
FROM openjdk:8
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
CMD ["java", "-jar", "app.jar"]
EOF

echo "📝 Writing Dockerfile for frontend..."

# Write Dockerfile for frontend
cat <<'EOF' > frontend/Dockerfile
# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# ---- Serve Stage ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

echo "📝 Writing docker-compose.yml..."

# Write docker-compose.yml
cat <<'EOF' > docker-compose.yml
version: "3.8"

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    networks:
      - app-network
    depends_on:
      - user-service

  user-service:
    build: ./user-service
    ports:
      - "8081:8081"
    networks:
      - app-network
    environment:
      - SPRING_DATASOURCE_URL=${SPRING_DATASOURCE_URL}
      - SPRING_DATASOURCE_USERNAME=${SPRING_DATASOURCE_USERNAME}
      - SPRING_DATASOURCE_PASSWORD=${SPRING_DATASOURCE_PASSWORD}

networks:
  app-network:
    driver: bridge
EOF

echo "📝 Writing .env file..."

# Write .env file
cat <<'EOF' > .env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/testdb
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=root
EOF

echo "✅ Setup complete! To start the project, run:"

echo -e "\n🚀 \033[1mdocker-compose up --build\033[0m"
