#!/bin/bash

# Start MongoDB if not running
echo "Checking if MongoDB is running..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "Starting MongoDB..."
    mongod --fork --logpath /var/log/mongodb.log
    if [ $? -ne 0 ]; then
        echo "Failed to start MongoDB. Starting without it..."
    else
        echo "MongoDB started successfully."
    fi
else
    echo "MongoDB is already running."
fi

# Start backend server
echo "Starting backend server..."
cd Backend
npm install

# Initialize the database with test data
echo "Initializing database with test data..."
node scripts/init-db.js

# Start the backend server
PORT=12000 npm start &
BACKEND_PID=$!
echo "Backend server started with PID: $BACKEND_PID"

# Start frontend server
echo "Starting frontend server..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!
echo "Frontend server started with PID: $FRONTEND_PID"

echo "Both servers are running."
echo "Backend: http://localhost:12000"
echo "Frontend: http://localhost:12001"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID