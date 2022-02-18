import React, { FC } from "react";
import { ProgressCircle } from "../../../components/common/ProgressCircle";
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
        <span>Completed</span>
        <span className="time">{formatTime(totalCompleted)}</span>
        <span>of</span>
        <span className="time">{formatTime(total)}</span>
        <ProgressCircle progress={(totalCompleted / total) * 100} size={16} />
      </div>

      <style jsx>{`
        .TotalTime {
          display: flex;
          align-items: center;
          font-size: var(--font-size-1);
          line-height: var(--line-height-1);
        }

        .TotalTime > :global(* + *) {
          margin-left: var(--size-02);
        }

        .time {
          font-family: var(--font-family-mono);
        }
      `}</style>
    </>
  );
};
