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
    text: "You stand before an imposing Victorian mansion, its decrepit facade looming against the stormy sky. Lightning illuminates the broken windows, casting eerie shadows. A cold wind carries whispers of untold horrors from within.",
    image: "https://images.unsplash.com/photo-1494376877685-d3d2559d4f82",
    choices: [
      { id: "enter_front", text: "Enter through the creaking front door" },
      { id: "check_window", text: "Peer through a shattered window" }
    ]
  },
  check_window: {
    text: "Through the broken glass, you glimpse movement in the darkness. A figure, impossibly tall and thin, glides past. Your heart races as you notice its elongated fingers trailing across the walls, leaving dark marks in their wake.",
    image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e",
    choices: [
      { id: "enter_window", text: "Climb through the window" },
      { id: "run_away", text: "Turn back while you still can" }
    ]
  },
  enter_window: {
    text: "Glass crunches under your feet as you enter. The musty air fills your lungs, and somewhere in the darkness, you hear what sounds like children's laughter. The floorboards creak ominously beneath you.",
    image: "https://images.unsplash.com/photo-1631856954611-9fd8527732bc",
    choices: [
      { id: "follow_laughter", text: "Follow the haunting laughter" },
      { id: "search_room", text: "Search the room you're in" }
    ]
  },
  enter_front: {
    text: "The heavy door groans open, revealing a grand foyer covered in dust and cobwebs. A chandelier sways gently above, though there's no breeze. In the corner, an antique mirror reflects a figure that isn't there when you turn around.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    choices: [
      { id: "upstairs", text: "Climb the grand staircase" },
      { id: "parlor", text: "Enter the dimly lit parlor" }
    ]
  },
  parlor: {
    text: "The parlor is frozen in time, a testament to long-forgotten elegance. A ghostly melody drifts from an ancient piano in the corner, its keys moving without a player. Family portraits on the walls seem to follow your every move with their hollow eyes.",
    image: "https://images.unsplash.com/photo-1517940310602-26535839fe84",
    choices: [
      { id: "investigate_piano", text: "Approach the self-playing piano" },
      { id: "examine_portraits", text: "Study the watchful portraits" }
    ]
  },
  upstairs: {
    text: "Each step of the grand staircase releases a mournful cry. At the top, a long hallway stretches into darkness. Doors line both sides, and one at the far end stands slightly ajar, a faint red light pulsing from within.",
    image: "https://images.unsplash.com/photo-1572883454114-1cf0031ede2a",
    choices: [
      { id: "red_door", text: "Investigate the door with red light" },
      { id: "master_bedroom", text: "Enter the master bedroom" }
    ]
  }
} as const;

export type StoryNode = keyof typeof storyNodes;