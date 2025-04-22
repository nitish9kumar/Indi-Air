#!/bin/bash

# IndiAir Local Environment Setup Script

echo "Setting up IndiAir local environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm v9 or higher."
    exit 1
fi

# Check node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "Node.js version is below 18. Please upgrade to v18 or higher."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL v14 or higher."
    exit 1
fi

echo "Installing dependencies..."
npm install

# Prompt for database configuration
echo "Setting up database..."
read -p "Enter PostgreSQL username: " PG_USER
read -s -p "Enter PostgreSQL password: " PG_PASS
echo
read -p "Enter PostgreSQL host (default: localhost): " PG_HOST
PG_HOST=${PG_HOST:-localhost}
read -p "Enter PostgreSQL port (default: 5432): " PG_PORT
PG_PORT=${PG_PORT:-5432}
read -p "Enter database name (default: indiair): " DB_NAME
DB_NAME=${DB_NAME:-indiair}

# Create .env file
echo "Creating .env file..."
cat > .env << EOF
# Database Configuration
DATABASE_URL=postgres://$PG_USER:$PG_PASS@$PG_HOST:$PG_PORT/$DB_NAME

# Stripe Payment Integration (optional)
# STRIPE_SECRET_KEY=your_stripe_secret_key
# VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
EOF

# Attempt to create database
echo "Creating database $DB_NAME..."
PGPASSWORD=$PG_PASS psql -h $PG_HOST -p $PG_PORT -U $PG_USER -c "CREATE DATABASE $DB_NAME;" || {
    echo "Failed to create database. If it already exists, you can ignore this message."
}

# Run database migrations
echo "Running database migrations..."
npm run db:push

echo "Setup complete! Start the application with: npm run dev"
echo "Access the application at: http://localhost:5000"