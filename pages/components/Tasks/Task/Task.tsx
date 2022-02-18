import React, { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Task as TaskType, useTaskContext } from "../TasksProvider";
import { CheckButton } from "./CheckButton";
import { IconButton } from "./IconButton";
import { TaskName } from "./TaskName";
import { Timer } from "./Timer";

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = ({ task }) => {
  return (
    <>
      <div className="Task">
        <CheckButton
          progress={(task.completedTime / task.time) * 100}
          onComplete={() => {
            task.complete();
          }}
          onReset={() => {
            task.reset();
          }}
          checked={task.isCompleted}
        />
        <div className="inner">
          <TaskName task={task} />
          <div className="actions">
            <IconButton
              icon={<FaTrash />}
              onClick={() => {
                task.remove();
              }}
            />
            <Timer task={task} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .Task {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .Task > :global(* + *) {
          margin-left: var(--size-05);
        }

        .inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--gray-200);
          padding: var(--size-05);
          border-radius: var(--border-radius-3);
          width: 100%;
        }

        .inner > :global(* + *) {
          margin-left: var(--size-05);
        }

        .actions {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .actions > :global(* + *) {
          margin-left: var(--size-05);
        }
      `}</style>
    </>
  );
};
