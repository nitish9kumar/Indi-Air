#!/bin/bash

# IndiAir Production Deployment Script

# Exit on error
set -e

echo "Starting IndiAir deployment process..."

# Update repository
if [ -d ".git" ]; then
    echo "Updating git repository..."
    git pull
else
    echo "No git repository found. Skipping update."
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application
echo "Building the application..."
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing globally..."
    npm install -g pm2
fi

# Check if application is already running in PM2
if pm2 list | grep -q "indiair"; then
    echo "Restarting application with PM2..."
    pm2 restart indiair
else
    echo "Starting application with PM2..."
    pm2 start npm --name "indiair" -- start
    
    # Configure PM2 to start on system boot
    echo "Setting up PM2 to start on system boot..."
    pm2 startup
    pm2 save
fi

echo "Deployment complete! Application is running."
echo "Monitor logs with: pm2 logs indiair"
echo "Check status with: pm2 status"