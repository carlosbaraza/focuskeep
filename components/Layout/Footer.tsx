import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";

type Props = {};

export const Footer: FC<Props> = (props) => {
  return (
    <>
      <footer className="Footer">
        <span>Made with ♥ in London</span>
        <a className="icon" href="https://github.com/carlosbaraza/focuskeep">
          <FaGithub />
        </a>
      </footer>

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

        .Footer > :global(* + *) {
          margin-left: var(--size-05);
        }

        .icon {
          font-size: var(--size-05);
        }
      `}</style>
    </>
  );
};
