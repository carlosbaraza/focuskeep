import { v4 as uuidv4 } from "uuid";
import { notEmpty } from "./utils";

export type TaskStored = {
  id: string;
  name: string;
  time: number; // seconds
  completedTime: number; // seconds
  updatedAt: string;
  createdAt: string;
};

export class Tasks {
  static fetch(id: string): TaskStored | null {
    const json = window.localStorage.getItem(id);
    if (json) {
      try {
        return JSON.parse(json) as TaskStored;
      } catch (error) {
        console.error("error parsing stored task", error);
      }
    }
    return null;
  }

  static fetchAll(): TaskStored[] {
    return Object.keys(window.localStorage)
      .filter((k) => k.includes("task-"))
      .map((id) => window.localStorage.getItem(id))
      .map((json) => {
        if (json) {
          try {
            return JSON.parse(json) as TaskStored;
          } catch (error) {
            console.error("error parsing stored task", error);
          }
        }
      })
      .filter(notEmpty);
  }

  static updateOne(id: string, task: Omit<TaskStored, "id">): TaskStored {
    const updated = { ...task, id, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(id, JSON.stringify(updated));
    return updated;
  }

  static remove(id: string) {
    window.localStorage.removeItem(id);
  }

  static create(task: Omit<TaskStored, "id" | "updatedAt" | "createdAt">): TaskStored {
    const id = `task-${uuidv4()}`;
    const created = {
      ...task,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(id, JSON.stringify(created));
    return created;
  }
}
