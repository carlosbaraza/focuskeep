import React, { FC } from "react";
import { formatTime } from "./Task/Timer";
import { Task, useTaskContext } from "./TasksProvider";

type Props = {};

export const TotalTime: FC<Props> = ({}) => {
  const { tasks } = useTaskContext();
  const total = tasks.reduce((acc, task) => task.time + acc, 0);
  const totalCompleted = tasks.reduce((acc, task) => task.completedTime + acc, 0);

  return (
    <>
      <div className="TotalTime">
        Completed {formatTime(totalCompleted)} of {formatTime(total)}
      </div>

      <style jsx>{`
        .TotalTime {
          font-size: var(--font-size-1);
          line-height: var(--line-height-1);
        }
      `}</style>
    </>
  );
};
