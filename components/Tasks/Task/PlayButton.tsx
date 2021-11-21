import React, { FC } from "react";
import { FaPlay } from "react-icons/fa";

type Props = {
  onClick(): void;
};

export const PlayButton: FC<Props> = (props) => {
  return (
    <>
      <button className="PlayButton" onClick={props.onClick}>
        <FaPlay />
      </button>

      <style jsx>{`
        .PlayButton {
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
