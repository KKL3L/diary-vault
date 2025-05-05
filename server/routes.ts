import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Since this is a fully client-side app using IndexedDB for storage,
  // we don't need any API routes for data persistence
  
  // Just serve the static files
  
  const httpServer = createServer(app);
  
  return httpServer;
}
