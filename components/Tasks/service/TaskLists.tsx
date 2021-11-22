import { v4 as uuidv4 } from "uuid";
import { Tasks } from "./Tasks";
import { notEmpty } from "./utils";

export type TaskListStored = {
  id: string;
  date: string;
  taskIds: string[];
  updatedAt: string;
  createdAt: string;
};

export class TaskLists {
  static fetch(id: string): TaskListStored | null {
    const json = window.localStorage.getItem(id);
    if (json) {
      try {
        return JSON.parse(json) as TaskListStored;
      } catch (error) {
        console.error("error parsing stored task list", error);
      }
    }
    return null;
  }

  static fetchAll(): TaskListStored[] {
    return Object.keys(window.localStorage)
      .filter((k) => k.includes("TaskList-"))
      .map((id) => window.localStorage.getItem(id))
      .map((json) => {
        if (json) {
          try {
            return JSON.parse(json) as TaskListStored;
          } catch (error) {
            console.error("error parsing stored task", error);
          }
        }
      })
      .filter(notEmpty);
  }

  static fetchToday(): TaskListStored {
    const all = this.fetchAll();
    const todayList = all.find((list) => {
      const date = new Date(list.date);
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    });
    if (todayList) return todayList;
    const latest = all.sort((a, b) => (a.date < b.date ? 1 : -1))[0];
    if (latest) {
      const clonedTaskIds = latest.taskIds
        .map((id) => Tasks.fetch(id))
        .filter(notEmpty)
        .map((task) => Tasks.create({ ...task, completedTime: 0 }))
        .map((task) => task.id);
      return TaskLists.create({
        ...latest,
        date: new Date().toISOString(),
        taskIds: clonedTaskIds,
      });
    } else {
      return TaskLists.create({ date: new Date().toISOString(), taskIds: [] });
    }
  }

  static updateOne(id: string, task: Omit<TaskListStored, "id">): TaskListStored {
    const updated = { ...task, id, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(id, JSON.stringify(updated));
    return updated;
  }

  static remove(id: string) {
    window.localStorage.removeItem(id);
  }

  static create(task: Omit<TaskListStored, "id" | "updatedAt" | "createdAt">): TaskListStored {
    const id = `TaskList-${uuidv4()}`;
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
