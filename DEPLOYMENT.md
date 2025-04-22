# IndiAir Deployment Guide

This guide provides detailed instructions for deploying the IndiAir application in different environments.

## Local Deployment

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- PostgreSQL v14 or higher

### Step-by-Step Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/indiair.git
cd indiair
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory with the following:

```
# Database Configuration
DATABASE_URL=postgres://yourusername:yourpassword@localhost:5432/indiair

# Stripe Payment Integration (if needed)
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Create the database**

```bash
createdb indiair
```

5. **Run database migrations**

```bash
npm run db:push
```

6. **Start the application**

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

The application will be available at http://localhost:5000

## Production Deployment

### Option 1: Traditional Server Deployment

1. **Set up a production server**
   - Provision a server with Node.js and PostgreSQL installed
   - Set up NGINX or Apache as a reverse proxy

2. **Deploy the application**

```bash
# Clone the repository
git clone https://github.com/yourusername/indiair.git
cd indiair

# Install dependencies
npm install

# Create production build
npm run build

# Set up environment variables
# (Create .env file with production values)

# Start the application
npm start
```

3. **Configure NGINX as a reverse proxy**

```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Set up SSL with Let's Encrypt**

```bash
sudo certbot --nginx -d yourdomain.com
```

### Option 2: Docker Deployment

1. **Create a Dockerfile**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

2. **Create a docker-compose.yml file**

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/indiair
      - NODE_ENV=production
    depends_on:
      - db
    restart: always

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=indiair
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

3. **Build and start the Docker containers**

```bash
docker-compose up -d
```

### Option 3: Cloud Platform Deployment

#### Deploying to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Add environment variables in the Render dashboard
5. Set up a PostgreSQL database service on Render
6. Link the database to your web service using the environment variables

#### Deploying to Railway

1. Create a new project on Railway
2. Add your GitHub repository
3. Add a PostgreSQL database service
4. Configure environment variables
5. Deploy the application

## Maintenance and Monitoring

### Database Backups

Schedule regular PostgreSQL backups:

```bash
pg_dump -U username -d indiair > backup_$(date +%Y%m%d).sql
```

### Application Monitoring

1. **Set up application monitoring with PM2**

```bash
# Install PM2
npm install -g pm2

# Start application with PM2
pm2 start npm --name "indiair" -- start

# Configure PM2 to start on system boot
pm2 startup
pm2 save
```

2. **View logs**

```bash
pm2 logs indiair
```

### Updating the Application

```bash
# Pull latest changes
git pull

# Install dependencies
npm install

# Rebuild the application
npm run build

# Restart the service
pm2 restart indiair
```

## Troubleshooting

### Common Issues and Solutions

1. **Database Connection Issues**
   - Verify your DATABASE_URL is correct
   - Check that PostgreSQL is running
   - Ensure database user has proper permissions

2. **Application Won't Start**
   - Check logs: `npm run dev` or `pm2 logs`
   - Verify all dependencies are installed
   - Check for syntax errors in environment variables

3. **Payment Processing Issues**
   - Verify Stripe API keys are correct
   - Check Stripe dashboard for transaction logs
   - Ensure your account is in the correct mode (test/live)

4. **Missing Frontend Assets**
   - Rebuild the frontend: `npm run build`
   - Check for build errors in the console
   - Verify the NGINX/Apache configuration is serving static files correctly