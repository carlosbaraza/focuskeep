import React, { FC, useState } from "react";
import { useTaskContext } from "./TasksProvider";

type Props = {};

export const TaskInput: FC<Props> = (props) => {
  const { addTask, list } = useTaskContext();
  const [value, setValue] = useState("");

  const onSubmit = () => {
    if (!list?.id) return;
    addTask({
      name: value,
      time: 30 * 60,
      completedTime: 0,
      listId: list.id,
    });
    setValue("");
  };

  return (
    <>
      <div className="TaskInput">
        <input
          placeholder="What do you want to focus on?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
        <button className="add-button" disabled={!value} onClick={() => onSubmit()}>
          Add
        </button>
      </div>

      <style jsx>{`
        .TaskInput {
          display: flex;
          width: 100%;
          position: relative;
        }

        input {
          border-radius: var(--border-radius-3);
          padding: var(--size-05);
          width: 100%;
          box-shadow: var(--box-shadow-2);
        }

        .add-button {
          position: absolute;
          right: var(--size-05);
          height: var(--size-07);
          background: var(--blue-400);
          color: white;
          padding: 0 var(--size-04);
          top: 50%;
          margin-top: -16px;
          border-radius: var(--border-radius-5);
          cursor: pointer;
        }

        .add-button:disabled {
          background: var(--gray-300);
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};
