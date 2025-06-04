import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { bookingSchema, insertFlightSearchSchema } from "@shared/schema";
import { logger } from "@shared/logger"; // Assuming a logger utility exists
import { inspect } from "util"; // For detailed error inspection
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Flight booking endpoint
  app.post("/api/bookings", async (req: Request, res: Response) => {
    try {
      // Log received data for debugging
      console.log("Received booking data:", req.body);
      
      // Format the departure date properly
      let formattedDate = req.body.departureDate;
      
      // Check if departureDate is a Date object and convert it
      if (req.body.departureDate && typeof req.body.departureDate === 'object' && req.body.departureDate instanceof Date) {
        formattedDate = req.body.departureDate.toISOString().split('T')[0];
      } else if (req.body.departureDate && typeof req.body.departureDate === 'string') {
        // If it's already a string, keep it as is
        formattedDate = req.body.departureDate;
      }
      
      // Validate the request body
      const validatedData = bookingSchema.parse({
        ...req.body,
        departureDate: formattedDate,
        userId: req.body.userId || null, // Make userId optional
      });
      
      // Create booking in storage
      const booking = await storage.createBooking({
        source: validatedData.source,
        destination: validatedData.destination,
        departureDate: validatedData.departureDate,
        passengers: validatedData.passengers,
        userId: validatedData.userId,
      });
      
      return res.status(201).json({ 
        success: true, 
        message: "Booking created successfully", 
        data: booking 
      });
    } catch (error) {
      logger.error("Error in /api/bookings endpoint", {
        error: inspect(error, { depth: null }), // Log detailed error information
      });
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error("Error processing booking:", error);
      return res.status(500).json({ 
        success: false, 
        message: "Server error", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get booking by ID
  app.get("/api/bookings/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid booking ID" 
        });
      }
      
      const booking = await storage.getBooking(id);
      
      if (!booking) {
        return res.status(404).json({ 
          success: false, 
          message: "Booking not found" 
        });
      }
      
      return res.json({ 
        success: true, 
        data: booking 
      });
    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: "Server error" 
      });
    }
  });

  // Flight search endpoint
  app.post("/api/search-flights", async (req: Request, res: Response) => {
    try {
      // Log received data for debugging
      console.log("Received flight search data:", req.body);

      // Validate the request body
      const validatedData = insertFlightSearchSchema.parse({
        ...req.body,
        createdAt: new Date().toISOString(),
      });

      // Save the search data in the database
      const search = await storage.createFlightSearch(validatedData);

      // Generate mock flight results (looped 5 times)
      const mockResults = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        source: validatedData.source,
        destination: validatedData.destination,
        departureDate: validatedData.departureDate,
        airline: `Airline ${index + 1}`,
        price: (100 + index * 50).toFixed(2),
      }));

      return res.status(200).json({
        success: true,
        message: "Flight search completed successfully",
        data: mockResults,
      });
    } catch (error) {
      logger.error("Error in /api/search-flights endpoint", {
        error: inspect(error, { depth: null }),
      });
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }

      console.error("Error processing flight search:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });

  app.post('/*', (req, res) => {
    const newEvent = req.body;

    // Check if the file exists
    if (!fs.existsSync('userJourney.json')) {
        // Create the file with an empty array if it doesn't exist
        fs.writeFileSync('userJourney.json', '[]');
    }

    // Read the existing data from userJourney.json
    fs.readFile('userJourney.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let events = [];
        if (data) {
            events = JSON.parse(data);
        }

        // Append the new event
        events.push(newEvent);

        // Write the updated data back to userJourney.json
        fs.writeFile('userJourney.json', JSON.stringify(events, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.send('Data saved successfully');
            }
        });
    });
});

  const httpServer = createServer(app);

  return httpServer;
}
