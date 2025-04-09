import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatbotResponseSchema } from "@shared/schema";
import { WebSocketServer } from "ws";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  const apiRouter = express.Router();
  
  // Get all timeline items
  apiRouter.get("/timeline", async (req, res) => {
    try {
      const timelineItems = await storage.getTimelineItems();
      res.json(timelineItems);
    } catch (error) {
      console.error("Error fetching timeline items:", error);
      res.status(500).json({ message: "Error fetching timeline items" });
    }
  });
  
  // Get all chatbot responses (for admin purposes)
  apiRouter.get("/chatbot-responses", async (req, res) => {
    try {
      const chatbotResponses = await storage.getChatbotResponses();
      res.json(chatbotResponses);
    } catch (error) {
      console.error("Error fetching chatbot responses:", error);
      res.status(500).json({ message: "Error fetching chatbot responses" });
    }
  });
  
  // Get responses by category
  apiRouter.get("/chatbot-responses/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const responses = await storage.getChatbotResponsesByCategory(category);
      res.json(responses);
    } catch (error) {
      console.error("Error fetching responses by category:", error);
      res.status(500).json({ message: "Error fetching responses by category" });
    }
  });
  
  // Create a new chatbot response
  apiRouter.post("/chatbot-responses", async (req, res) => {
    try {
      const data = insertChatbotResponseSchema.parse(req.body);
      const newResponse = await storage.createChatbotResponse(data);
      res.status(201).json(newResponse);
    } catch (error) {
      console.error("Error creating chatbot response:", error);
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.use("/api", apiRouter);

  const httpServer = createServer(app);
  
  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ 
    server: httpServer,
    path: "/ws" // Use a specific path for WebSocket connections
  });
  
  // WebSocket message validation schema
  const chatMessageSchema = z.object({
    type: z.enum(["query"]),
    message: z.string().min(1),
  });
  
  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");
    
    ws.on("message", async (message) => {
      try {
        // Parse the incoming message
        const data = JSON.parse(message.toString());
        
        // Validate message format
        const validatedData = chatMessageSchema.parse(data);
        
        // Process the query
        if (validatedData.type === "query") {
          const query = validatedData.message;
          
          // Get a response from the storage
          const response = await storage.getChatbotResponseByQuery(query);
          
          // Send typing indicator first (simulate thinking)
          ws.send(JSON.stringify({ type: "typing", typing: true }));
          
          // Wait a short delay to simulate processing time
          setTimeout(() => {
            // Send the actual response
            ws.send(JSON.stringify({
              type: "response",
              message: response?.response || "I'm not sure about that. Could you ask something about chatbots?",
            }));
          }, 1500);
        }
      } catch (error) {
        console.error("WebSocket error:", error);
        ws.send(JSON.stringify({
          type: "error",
          message: "There was an error processing your request.",
        }));
      }
    });
    
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
    
    // Send a welcome message
    ws.send(JSON.stringify({
      type: "response",
      message: "Hello! I'm an AI assistant designed to help you learn about chatbots. How can I assist you today?",
    }));
  });

  return httpServer;
}
