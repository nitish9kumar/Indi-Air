-- Initialize IndiAir Database

-- Connect to the database
\c indiair;

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The actual database schema is created by Drizzle ORM
-- This file is just to ensure the database is properly initialized
-- and any necessary extensions are added

-- You can add any additional initialization here if needed