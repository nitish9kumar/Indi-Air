import { 
  users, 
  type User, 
  type InsertUser, 
  bookings, 
  type Booking, 
  type InsertBooking 
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface remains the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBooking(id: number): Promise<Booking | undefined>;
  getUserBookings(userId: number): Promise<Booking[]>;
}

// DatabaseStorage replaces MemStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const now = new Date().toISOString();
    const [booking] = await db
      .insert(bookings)
      .values({
        ...insertBooking,
        createdAt: now
      })
      .returning();
    return booking;
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }
  
  async getUserBookings(userId: number): Promise<Booking[]> {
    if (!userId) return [];
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }
}

export const storage = new DatabaseStorage();
