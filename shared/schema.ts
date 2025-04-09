import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const chatbotResponses = pgTable("chatbot_responses", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  response: text("response").notNull(),
  category: text("category").notNull(),
});

export const insertChatbotResponseSchema = createInsertSchema(chatbotResponses).pick({
  query: true,
  response: true,
  category: true,
});

export type InsertChatbotResponse = z.infer<typeof insertChatbotResponseSchema>;
export type ChatbotResponse = typeof chatbotResponses.$inferSelect;

export const timelineItems = pgTable("timeline_items", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const insertTimelineItemSchema = createInsertSchema(timelineItems).pick({
  year: true,
  title: true,
  description: true,
  order: true,
});

export type InsertTimelineItem = z.infer<typeof insertTimelineItemSchema>;
export type TimelineItem = typeof timelineItems.$inferSelect;
