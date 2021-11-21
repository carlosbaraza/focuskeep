import React, { FC, useState } from "react";
import { useTaskContext } from "./TasksProvider";

type Props = {};

export const TaskInput: FC<Props> = (props) => {
  const { addTask } = useTaskContext();
  const [value, setValue] = useState("");

  return (
    <>
      <div className="TaskInput">
        <input
          placeholder="Add new daily task"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask({
                name: value,
                time: 30 * 60,
                completedTime: 0,
              });
              setValue("");
            }
          }}
        />
      </div>

      <style jsx>{`
        .TaskInput {
          display: flex;
          width: 100%;
        }

        input {
          border-radius: var(--border-radius-3);
          padding: var(--size-05);
          width: 100%;
          box-shadow: var(--box-shadow-2);
        }
      `}</style>
    </>
  );
};
