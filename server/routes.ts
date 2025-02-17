import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/progress", async (req, res) => {
    const parsed = insertProgressSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid progress data" });
    }
    
    const progress = await storage.saveProgress(parsed.data);
    res.json(progress);
  });

  app.get("/api/progress/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const progress = await storage.getProgress(id);
    if (!progress) {
      return res.status(404).json({ error: "Progress not found" });
    }

    res.json(progress);
  });

  return createServer(app);
}
