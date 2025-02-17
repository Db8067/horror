import { storyProgress, type Progress, type InsertProgress } from "@shared/schema";

export interface IStorage {
  saveProgress(progress: InsertProgress): Promise<Progress>;
  getProgress(id: number): Promise<Progress | undefined>;
}

export class MemStorage implements IStorage {
  private progress: Map<number, Progress>;
  private currentId: number;

  constructor() {
    this.progress = new Map();
    this.currentId = 1;
  }

  async saveProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.currentId++;
    const progress: Progress = { id, ...insertProgress };
    this.progress.set(id, progress);
    return progress;
  }

  async getProgress(id: number): Promise<Progress | undefined> {
    return this.progress.get(id);
  }
}

export const storage = new MemStorage();
