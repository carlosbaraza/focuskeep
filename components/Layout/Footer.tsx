import React, { FC } from "react";

type Props = {};

export const Footer: FC<Props> = (props) => {
  return (
    <>
      <footer className="Footer">Made with ♥ in London</footer>

      <style jsx>{`
        .Footer {
          display: flex;
          min-height: var(--size-08);
          align-items: center;
          padding: 0 var(--size-05);
          color: var(--gray-700);
          background: var(--gray-200);
          font-weight: bold;
          font-size: var(--font-size-1);
          line-height: var(--line-height-1);
        }
      `}</style>
    </>
  );
};
