import React, { FC } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { Task } from "../TasksProvider";
import { EditableTime } from "./EditableTime";
import { IconButton } from "./IconButton";
import { PauseButton } from "./PauseButton";
import { PlayButton } from "./PlayButton";

type Props = {
  task: Task;
};

function pad(n: number, width: number, z: string): string {
  z = z || "0";
  const stringN = n + "";
  return stringN.length >= width
    ? stringN
    : new Array(width - stringN.length + 1).join(z) + stringN;
}

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time % 60);
  if (hours > 0) {
    return `${pad(hours, 2, "0")}:${pad(minutes, 2, "0")}:${pad(seconds, 2, "0")}`;
  } else {
    return `${pad(minutes, 2, "0")}:${pad(seconds, 2, "0")}`;
  }
};

export const Timer: FC<Props> = ({ task }) => {
  const completedTime = formatTime(task.completedTime);

  return (
    <>
      <div className="Timer">
        <div className="time">
          <span className="completed">{completedTime}</span>
          <span className="bar">/</span>
          <span className="total">
            <EditableTime time={task.time} onChange={(time) => task.update({ ...task, time })} />
          </span>
        </div>
        {task.isPlaying ? (
          <PauseButton
            onClick={() => {
              task.pause();
            }}
          />
        ) : (
          <PlayButton
            onClick={() => {
              task.start();
            }}
          />
        )}
      </div>

      <style jsx>{`
        .Timer {
          display: flex;
          align-items: center;
          font-family: var(--font-family-mono);
        }

        .Timer > :global(* + *) {
          margin-left: var(--size-03);
        }

        .time {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--gray-500);
          font-size: var(--font-size-0);
        }

        .time .bar {
          display: none;
          margin-left: var(--size-02);
          margin-right: var(--size-02);
        }

        @media (min-width: 768px) {
          .time {
            display: inline-block;
            font-size: var(--font-size-1);
          }

          .time .bar {
            display: inline-block;
            white-space: pre;
          }
        }
      `}</style>
    </>
  );
};
