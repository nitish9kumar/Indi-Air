# IndiAir - Indian Airline Booking Platform

A comprehensive Indian airline booking platform that offers a seamless and culturally-rich flight reservation experience.

![IndiAir Logo](./client/src/assets/logo.png)

## Features

- **Cultural Design**: Vibrant UI inspired by Indian culture and colors
- **Complete Booking Flow**: Search flights, select seats, payment processing, and booking confirmation
- **Responsive Design**: Mobile-first approach ensuring compatibility across devices
- **Real-time Updates**: Instant confirmation and booking details
- **User-friendly Interface**: Intuitive navigation and clear call-to-actions

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **State Management**: React Query
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom theming based on Indian flag colors

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/indiair.git
cd indiair
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_URL=postgres://yourusername:yourpassword@localhost:5432/indiair

# Optional: Stripe Payment (if implementing payment gateway)
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Set up the database

Ensure PostgreSQL is running on your machine, then create a new database:

```bash
createdb indiair
```

Run the database migrations:

```bash
npm run db:push
```

### 5. Start the development server

```bash
npm run dev
```

The application will be available at http://localhost:5000

## Project Structure

```
/
├── client/                 # Frontend code
│   ├── src/
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main application component
│   │   └── main.tsx        # Entry point
├── server/                 # Backend code
│   ├── db.ts               # Database configuration
│   ├── index.ts            # Express server setup
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite middleware for Express
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts           # Database schema and types
└── package.json            # Project dependencies and scripts
```

## Using the Application

1. **Home Page**: Browse featured destinations and offers
2. **Search Flights**: Enter source, destination, date, and passenger details
3. **Select Flight**: Choose from available flight options
4. **Seat Selection**: Pick your preferred seats on the airplane
5. **Payment**: Enter payment details (use the Quick Demo Pay for testing)
6. **Confirmation**: View booking details and confirmation

## Testing the Booking Flow

For a quick test of the booking flow:

1. Search for a flight (e.g., Mumbai to Singapore)
2. Click "Book Now" on any flight
3. Select seats on the seat map
4. Click "Proceed to Payment"
5. On the payment page, click "Quick Demo Pay" (this bypasses form validation for testing)
6. View your booking confirmation

## Deployment

For production deployment:

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.