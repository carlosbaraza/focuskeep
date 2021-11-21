import React, { FC, useState } from "react";
import { Task } from "../TasksProvider";

type Props = { task: Task };

export const TaskName: FC<Props> = ({ task }) => {
  const [value, setValue] = useState(task.name);

  return (
    <>
      <input
        className="TaskName"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          task.update({ ...task, name: event.target.value });
        }}
      />

      <style jsx>{`
        .TaskName {
          background: transparent;
          flex-grow: 1;
          border-bottom: 2px solid transparent;
        }

        .TaskName:focus {
          outline: none;
          border-bottom: 2px solid var(--gray-800);
        }
      `}</style>
    </>
  );
};
