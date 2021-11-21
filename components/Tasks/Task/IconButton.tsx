import React, { FC, ReactNode } from "react";

type Props = {
  icon: ReactNode;
  onClick(): void;
};

export const IconButton: FC<Props> = (props) => {
  return (
    <>
      <button className="IconButton" onClick={props.onClick}>
        {props.icon}
      </button>

      <style jsx>{`
        .IconButton {
          color: var(--gray-700);
        }
      `}</style>
    </>
  );
};
