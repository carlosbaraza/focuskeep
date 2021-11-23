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
import { getLogoProgressSvg } from "../common/LogoProgress";
import { useLogoContext } from "../common/LogoProvider";
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
  const requestTick = useRef(false);

  const updateTask = useCallback(
    async (updated: TaskState) => {
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
    },
    [tasks]
  );

  useEffect(() => {
    if (requestTick.current) {
      intervalTick.current();
      requestTick.current = false;
    }
  }, [requestTick, tasks]);

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

  const { setLogoProgress } = useLogoContext();

  const intervalTick = useRef(() => {
    const tickDate = new Date();

    tasksWithApi.current?.forEach((task) => {
      if (task.isCompleted) {
        if (task.isPlaying || task.completedTime > task.time) {
          task.complete();
        }
        return;
      }
    });

    const playingTask = tasksWithApi.current?.find((task) => task.isPlaying);
    if (playingTask) {
      const completedTime =
        playingTask.completedTime +
        (tickDate.getTime() - previousTickDate.current.getTime()) / 1000;
      playingTask.update({ ...playingTask, completedTime });

      const progress = (completedTime / playingTask.time) * 100;
      setLogoProgress(progress);

      if (completedTime >= playingTask.time) {
        playingTask.complete();
      }
    } else {
      const { total, completed } = (tasksWithApi.current || []).reduce(
        (acc, task) => {
          acc.total += task.time;
          acc.completed += task.completedTime;
          return acc;
        },
        { total: 0, completed: 0 }
      );
      const progress = completed > 0 ? (completed / total) * 100 : 60;
      setLogoProgress(progress);
    }

    // Detect change of date
    if (previousTickDate.current.getDate() !== tickDate.getDate()) {
      fetchData();
    }
    previousTickDate.current = tickDate;
  });

  useEffect(() => {
    fetchData();
    const handler = setInterval(() => {
      intervalTick.current();
    }, 1000);
    return () => {
      clearInterval(handler);
    };
  }, [fetchData, setLogoProgress]);

  tasksWithApi.current = useMemo(() => {
    return tasks.map(
      (task) =>
        ({
          ...task,
          isCompleted: task.completedTime >= task.time,
          complete() {
            if ("Notification" in window) {
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
            }
            updateTask({ ...task, isPlaying: false, completedTime: task.time });
            requestTick.current = true;
          },
          reset() {
            task.isPlaying = false;
            this.isPlaying = false;
            updateTask({ ...task, isPlaying: false, completedTime: 0 });
            requestTick.current = true;
          },
          remove() {
            if (!task.id) return;
            db.tasks.delete(task.id);
            const newTasks = tasks.filter((t) => t.id !== task.id);
            setTasks(newTasks);
            requestTick.current = true;
          },
          pause() {
            task.isPlaying = false;
            this.isPlaying = false;
            updateTask({ ...task, isPlaying: false });
          },
          start() {
            (tasksWithApi.current || []).filter((t) => t.isPlaying).forEach((t) => t.pause());
            task.isPlaying = true;
            this.isPlaying = true;
            updateTask({ ...task, isPlaying: true });
          },
          update(updatedTask) {
            updateTask({ ...task, ...updatedTask, id: task.id });
          },
        } as Task)
    );
  }, [tasks, updateTask]);

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
