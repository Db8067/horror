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

  app.post("/api/synthesize", async (req, res) => {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(503).json({ 
        error: "Please wait while we set up the audio narration service..." 
      });
    }

    try {
      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error(`ElevenLabs API error: ${response.statusText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      res.set('Content-Type', 'audio/mpeg');
      res.send(Buffer.from(audioBuffer));
    } catch (error) {
      console.error('Text-to-speech error:', error);
      res.status(500).json({ 
        error: "We're setting up the audio narration. Please try again in a moment." 
      });
    }
  });

  return createServer(app);
}