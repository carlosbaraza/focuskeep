// db.ts
import Dexie, { Table } from "dexie";

export type TaskListStored = {
  id?: number;
  date: Date;
  updatedAt?: Date;
  createdAt?: Date;
};

export type TaskStored = {
  id?: number;
  name: string;
  time: number; // seconds
  completedTime: number; // seconds
  listId: number;
  updatedAt?: Date;
  createdAt?: Date;
};

export class FocuskeepDexie extends Dexie {
  tasks!: Table<Optional<TaskStored, "id">>;
  taskLists!: Table<Optional<TaskListStored, "id">>;

  constructor() {
    super("focuskeep");
    this.version(1).stores({
      tasks: "++id, name, time, listId, completedTime, updatedAt, createdAt",
      taskLists: "++id, date, updatedAt, createdAt",
    });
  }
}

export const db = new FocuskeepDexie();
const creatingHook = (primKey: any, obj: any, transaction: any) => {
  obj.createdAt = new Date();
  obj.updatedAt = new Date();
};
const updatingHook = (mods: any, primKey: any, obj: any, trans: any) => {
  return { ...mods, updatedAt: new Date() };
};
db.tasks.hook("creating", creatingHook);
db.tasks.hook("updating", updatingHook);
db.taskLists.hook("creating", creatingHook);
db.taskLists.hook("updating", updatingHook);
(window as any).db = db;
