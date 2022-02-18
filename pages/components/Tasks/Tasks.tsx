import React, { FC } from "react";
import { ClearAllDataAction } from "./ClearAllDataAction";
import { TaskInput } from "./TaskInput";
import { TaskList } from "./TaskList";
import { TaskProvider } from "./TasksProvider";
import { TotalTime } from "./TotalTime";

type Props = {};

export const Tasks: FC<Props> = (props) => {
  return (
    <>
      <TaskProvider>
        <div className="Tasks">
          <header>
            <h1>Focused tasks for today</h1>
            <TotalTime />
          </header>
          <TaskList />
          <TaskInput />
          <div>
            <ClearAllDataAction />
          </div>
        </div>
      </TaskProvider>

      <style jsx>{`
        .Tasks {
          flex-grow: 1;
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
