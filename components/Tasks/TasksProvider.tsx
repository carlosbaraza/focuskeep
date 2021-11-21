import { createContext, FC, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type TaskStored = {
  id: string;
  name: string;
  time: number; // seconds
  completedTime: number; // seconds
};

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
  update(task: Partial<Omit<TaskState, "id">>): void;
};

type Context = {
  addTask(task: Omit<TaskStored, "id">): void;
  tasks: Task[];
};

const setTaskLocalStorage = (task: Omit<TaskStored, "id"> & { id?: string }): string => {
  const id = task.id || `task-${uuidv4()}`;
  window.localStorage.setItem(id, JSON.stringify({ ...task, id }));
  return id;
};

const saveTaskList = (taskIds: string[]) => {
  window.localStorage.setItem("tasks", JSON.stringify(taskIds));
};

const TasksContext = createContext<Context>({
  addTask: setTaskLocalStorage,
  tasks: [],
});

export const useTaskContext = () => useContext(TasksContext);

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const TaskProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<TaskState[]>([]);
  const tasksWithApi = useRef<Task[]>();

  const updateTask = (updatedTask: TaskState) => {
    const newTasks = tasks.map((task) => {
      if (task.id === updatedTask.id) {
        setTaskLocalStorage(updatedTask);
        return updatedTask;
      } else {
        return task;
      }
    });
    setTasks(newTasks);
    saveTaskList(newTasks.map((t) => t.id));
  };

  useEffect(() => {
    // fetch data from local storage
    let taskIds: string[] = [];
    try {
      const taskIdsJson = window.localStorage.getItem("tasks");
      if (typeof taskIdsJson === "string") {
        const taskIdsParsed = JSON.parse(taskIdsJson) as unknown;
        if (
          taskIdsParsed &&
          Array.isArray(taskIdsParsed) &&
          taskIdsParsed.every((t) => typeof t === "string")
        ) {
          taskIds = taskIdsParsed;
        }
      }
    } catch (error) {
      console.error("error parsing list of tasks", error);
    }

    setTasks(
      taskIds
        .map((taskId) => window.localStorage.getItem(taskId))
        .map((taskJson) => {
          if (taskJson) {
            try {
              return JSON.parse(taskJson) as TaskStored;
            } catch (error) {
              console.error("error parsing stored task", error);
            }
          }
        })
        .filter(notEmpty)
        .map((t) => ({ ...t, isPlaying: false }))
    );

    setInterval(() => {
      tasksWithApi.current?.forEach((task) => {
        if (task.isCompleted) {
          if (task.isPlaying || task.completedTime > task.time) {
            return task.update({ ...task, isPlaying: false, completedTime: task.time });
          }
          return;
        }

        if (task.isPlaying) {
          task.update({ ...task, completedTime: task.completedTime + 1 });
        }
      });
    }, 1000);
  }, []);

  tasksWithApi.current = tasks.map(
    (task) =>
      ({
        ...task,
        isCompleted: task.completedTime >= task.time,
        complete() {
          updateTask({ ...task, isPlaying: false, completedTime: task.time });
        },
        reset() {
          updateTask({ ...task, isPlaying: false, completedTime: 0 });
        },
        remove() {
          window.localStorage.removeItem(task.id);
          const newTasks = tasks.filter((t) => t.id !== task.id);
          setTasks(newTasks);
          saveTaskList(newTasks.map((t) => t.id));
        },
        pause() {
          updateTask({ ...task, isPlaying: false });
        },
        start() {
          updateTask({ ...task, isPlaying: true });
        },
        update(updatedTask) {
          console.log("update", { ...task, ...updatedTask, id: task.id });
          updateTask({ ...task, ...updatedTask, id: task.id });
        },
      } as Task)
  );

  return (
    <TasksContext.Provider
      value={{
        addTask: (task) => {
          const id = setTaskLocalStorage(task);
          const newTasks = [...tasks, { ...task, id, isPlaying: false }];
          setTasks(newTasks);
          saveTaskList(newTasks.map((t) => t.id));
        },
        tasks: tasksWithApi.current,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
