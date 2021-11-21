import React, { FC } from "react";

type Props = {};

export const Logo: FC<Props> = (props) => {
  return (
    <>
      <div className="Logo">FocusKeep</div>

      <style jsx>{`
        .Logo {
          font-weight: bold;
          font-size: var(--font-size-4);
          line-height: var(--line-height-4);
          color: var(--gray-700);
        }
      `}</style>
    </>
  );
};
