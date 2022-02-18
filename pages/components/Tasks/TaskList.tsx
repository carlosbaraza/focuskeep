import React, { FC } from "react";
import { Task } from "./Task/Task";
import { useTaskContext } from "./TasksProvider";

type Props = {};

export const TaskList: FC<Props> = (props) => {
  const { tasks } = useTaskContext();

  return (
    <>
      <div className="TaskList">
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>

      <style jsx>{`
        .TaskList {
        }

        .TaskList > :global(* + *) {
          margin-top: var(--size-05);
        }
      `}</style>
    </>
  );
};
