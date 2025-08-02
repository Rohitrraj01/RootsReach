#!/bin/bash

# Build and start the Docker containers
echo "Building and starting Docker containers..."
docker-compose up -d

# Wait for the containers to start
echo "Waiting for containers to start..."
sleep 10

# Check if the containers are running
echo "Checking container status..."
docker-compose ps

echo "Application is running!"
echo "Frontend: http://localhost:12001"
echo "Backend API: http://localhost:12000/api"
echo "Health check: http://localhost:12000/api/health"