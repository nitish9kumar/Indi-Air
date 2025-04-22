import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { bookingSchema } from "@shared/schema";

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

  const httpServer = createServer(app);

  return httpServer;
}
