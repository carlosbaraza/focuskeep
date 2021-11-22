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
import { TaskLists, TaskListStored } from "./service/TaskLists";
import { Tasks, TaskStored } from "./service/Tasks";
import { notEmpty } from "./service/utils";

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
};

const TasksContext = createContext<Context>({
  addTask: () => {},
  tasks: [],
});

export const useTaskContext = () => useContext(TasksContext);

export const TaskProvider: FC = ({ children }) => {
  const [tasks, setTasks] = useState<TaskState[]>([]);
  const [list, setList] = useState<TaskListStored | null>(null);
  const tasksWithApi = useRef<Task[]>();
  const previousTickDate = useRef(new Date());

  const updateTask = (updated: TaskState) => {
    const newTasks = tasks.map((task) => {
      if (task.id === updated.id) {
        Tasks.updateOne(task.id, updated);
        return updated;
      } else {
        return task;
      }
    });
    setTasks(newTasks);

    if (list) {
      const updatedList = { ...list, taskIds: newTasks.map((t) => t.id) };
      TaskLists.updateOne(list.id, updatedList);
    }
  };

  const fetchData = useCallback(() => {
    // fetch data from local storage
    const todayList = TaskLists.fetchToday();
    setList(todayList);

    setTasks(
      todayList.taskIds
        .map((id) => Tasks.fetch(id))
        .filter(notEmpty)
        .map((t) => ({ ...t, isPlaying: false }))
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
          Notification.requestPermission().then(() => {
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
          Tasks.remove(task.id);
          const newTasks = tasks.filter((t) => t.id !== task.id);
          setTasks(newTasks);
          if (list) {
            const updatedList = { ...list, taskIds: newTasks.map((t) => t.id) };
            TaskLists.updateOne(list.id, updatedList);
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
        addTask: (task) => {
          const newTask = Tasks.create(task);
          const newTasks = [...tasks, { ...newTask, isPlaying: false }];
          setTasks(newTasks);
          if (list) {
            const updatedList = { ...list, taskIds: newTasks.map((t) => t.id) };
            TaskLists.updateOne(list.id, updatedList);
          }
        },
        tasks: tasksWithApi.current,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
