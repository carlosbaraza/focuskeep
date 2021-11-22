import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { Container } from "./Container";

type Props = {};

export const Footer: FC<Props> = (props) => {
  return (
    <>
      <Container className="FooterContainer">
        <footer className="Footer">
          <span>Made with ♥ in London</span>
          <a className="icon" href="https://github.com/carlosbaraza/focuskeep">
            <FaGithub />
          </a>
        </footer>
      </Container>

      <style jsx>{`
        :global(.FooterContainer) {
          background: var(--gray-200);
        }

        .Footer {
          display: flex;
          min-height: var(--size-08);
          align-items: center;
          padding: 0 var(--size-05);
          color: var(--gray-700);
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
