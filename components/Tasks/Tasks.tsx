import React, { FC } from "react";
import { ClearAllDataAction } from "./ClearAllDataAction";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";
import { TaskProvider } from "./TasksProvider";

type Props = {};

export const Tasks: FC<Props> = (props) => {
  return (
    <>
      <TaskProvider>
        <div className="Tasks">
          <h1>Focused tasks for today</h1>
          <TaskList />
          <TaskInput />
          <div>
            <ClearAllDataAction />
          </div>
        </div>
      </TaskProvider>

      <style jsx>{`
        .Tasks {
        }

        .Tasks > :global(* + *) {
          margin-top: var(--size-05);
        }

        h1 {
          font-size: var(--font-size-4);
          line-height: var(--line-height-4);
          font-weight: bold;
        }
      `}</style>
    </>
  );
};
