import React, { FC } from "react";
import { FaPause } from "react-icons/fa";

type Props = {
  onClick(): void;
};

export const PauseButton: FC<Props> = (props) => {
  return (
    <>
      <button className="PauseButton" onClick={props.onClick}>
        <FaPause />
      </button>

      <style jsx>{`
        .PauseButton {
          background: var(--gray-400);
          padding: var(--size-03);
          border-radius: var(--border-radius-full);
          width: var(--size-07);
          height: var(--size-07);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-600);
        }
      `}</style>
    </>
  );
};
