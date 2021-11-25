import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { db } from "./db";
import { TaskListStored } from "./db";
import { TaskStored } from "./db";
import { notEmpty } from "./db/utils";

type TaskState = TaskStored & {
  isPlaying: boolean;
};

export type Task = TaskState & {
  isCompleted: boolean;
  start(): void;
  pause(): void;
  complete(): void;
  reset(): void;
  remove(): void;
  update(task: Partial<Omit<TaskState, "id" | "updatedAt" | "createdAt">>): void;
};

type Context = {
  addTask(task: Omit<TaskStored, "id" | "updatedAt" | "createdAt">): void;
  tasks: Task[];
  list: TaskListStored | null;
};

const TasksContext = createContext<Context>({
  addTask: () => {},
  tasks: [],
  list: null,
});

export const useTaskContext = () => useContext(TasksContext);

export const TaskProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<TaskState[]>([]);
  const [list, setList] = useState<TaskListStored | null>(null);
  const tasksWithApi = useRef<Task[]>();
  const previousTickDate = useRef(new Date());

  const updateTask = async (updated: TaskState) => {
    const newTasks = tasks.map((task) => {
      if (task.id && task.id === updated.id) {
        db.tasks.update(task.id, {
          name: updated.name,
          time: updated.time,
          completedTime: updated.completedTime,
        });
        return updated;
      } else {
        return task;
      }
    });
    setTasks(newTasks);

    if (list && list.id) {
      await db.taskLists.update(list.id, { taskIds: newTasks.map((t) => t.id) });
    }
  };

  const fetchData = useCallback(async () => {
    // fetch data from local storage
    let today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    let tomorrow = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    );

    let todayList = await (
      await db.taskLists.where("date").between(today, tomorrow, true, false)
    ).first();

    if (!todayList) {
      let latest = await (await db.taskLists.orderBy("date").reverse()).first();
      let latestTasks = latest?.id
        ? await db.tasks.where("listId").equals(latest.id).toArray()
        : [];

      const id = await db.taskLists.add({ date: new Date() });
      const newList = await db.taskLists.get(id);
      const newListId = newList?.id;
      if (!newListId) return;
      todayList = newList;

      await Promise.all(
        latestTasks.map(async (task) =>
          db.tasks.add({
            name: task.name,
            listId: newListId,
            time: task.time,
            completedTime: 0,
          })
        )
      );
    }

    if (!todayList.id) {
      throw new Error("List does not have an ID");
    }
    setList(todayList);

    setTasks(
      (await db.tasks.where("listId").equals(todayList.id).toArray()).map((t) => ({
        ...t,
        isPlaying: false,
      }))
    );
  }, []);

  useEffect(() => {
    fetchData();

    const handler = setInterval(() => {
      tasksWithApi.current?.forEach((task) => {
        if (task.isCompleted) {
          if (task.isPlaying || task.completedTime > task.time) {
            task.complete();
          }
          return;
        }

        if (task.isPlaying) {
          const completedTime = task.completedTime + 1;
          task.update({ ...task, completedTime });
          if (completedTime >= task.time) {
            task.complete();
          }
        }
      });

      // Detect change of date
      const tickDate = new Date();
      if (previousTickDate.current.getDate() !== tickDate.getDate()) {
        fetchData();
      }
      previousTickDate.current = tickDate;
    }, 1000);

    return () => {
      clearInterval(handler);
    };
  }, [fetchData]);

  tasksWithApi.current = tasks.map(
    (task) =>
      ({
        ...task,
        isCompleted: task.completedTime >= task.time,
        complete() {
          Notification.requestPermission?.()?.then(() => {
            if (document.hasFocus?.()) return;
            const notification = new Notification("Task completed!", {
              body: `${task.name} completed! You deserve a break`,
              requireInteraction: true,
            });
            notification.onclick = function (event) {
              window.focus();
              this.close();
            };
          });
          updateTask({ ...task, isPlaying: false, completedTime: task.time });
        },
        reset() {
          updateTask({ ...task, isPlaying: false, completedTime: 0 });
        },
        remove() {
          if (!task.id) return;
          db.tasks.delete(task.id);
          const newTasks = tasks.filter((t) => t.id !== task.id);
          setTasks(newTasks);
          if (list) {
            if (!list.id) return;
            const updatedList = { ...list, taskIds: newTasks.map((t) => t.id) };
            db.taskLists.update(list.id, updatedList);
          }
        },
        pause() {
          updateTask({ ...task, isPlaying: false });
        },
        start() {
          updateTask({ ...task, isPlaying: true });
        },
        update(updatedTask) {
          updateTask({ ...task, ...updatedTask, id: task.id });
        },
      } as Task)
  );

  return (
    <TasksContext.Provider
      value={{
        addTask: async (task) => {
          const newTaskId = await db.tasks.add(task);
          const newTask = await db.tasks.get(newTaskId);
          if (!newTask) {
            throw new Error("Error saving task");
          }
          const newTasks = [...tasks, { ...newTask, isPlaying: false }];
          setTasks(newTasks);
          if (list && list.id) {
            const updatedList = { ...list, taskIds: newTasks.map((t) => t.id) };
            db.taskLists.update(list.id, updatedList);
          }
        },
        list,
        tasks: tasksWithApi.current,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
