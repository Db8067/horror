import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const storyProgress = pgTable("story_progress", {
  id: serial("id").primaryKey(),
  currentNode: text("current_node").notNull(),
  choices: jsonb("choices").notNull().$type<string[]>(),
});

export const insertProgressSchema = createInsertSchema(storyProgress).pick({
  currentNode: true,
  choices: true,
});

export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof storyProgress.$inferSelect;

export const storyNodes = {
  start: {
    text: "You stand before an imposing Victorian mansion, its decrepit facade looming against the stormy sky. Lightning illuminates the broken windows, casting eerie shadows.",
    image: "https://images.unsplash.com/photo-1494376877685-d3d2559d4f82",
    choices: [
      { id: "enter_front", text: "Enter through the front door" },
      { id: "check_window", text: "Look through a broken window" }
    ]
  },
  enter_front: {
    text: "The heavy door creaks open, revealing a grand foyer covered in dust and cobwebs. A chandelier sways gently above, though there's no breeze.",
    image: "https://images.unsplash.com/photo-1631856954611-9fd8527732bc",
    choices: [
      { id: "upstairs", text: "Climb the grand staircase" },
      { id: "parlor", text: "Enter the parlor" }
    ]
  },
  // Add more story nodes as needed
} as const;

export type StoryNode = keyof typeof storyNodes;
