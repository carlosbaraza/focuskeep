import React, { FC } from "react";
import { Container } from "./Container";
import { Logo } from "../common/Logo";

type Props = {};

export const Navbar: FC<Props> = (props) => {
  return (
    <>
      <Container className="FooterContainer">
        <div className="Navbar">
          <Logo />
        </div>
      </Container>

      <style jsx>{`
        :global(.NavbarContainer) {
          background: var(--gray-200);
        }

        .Navbar {
          height: var(--size-08);
          background: var(--gray-200);
          display: flex;
          align-items: center;
          padding: 0 var(--size-05);
        }
      `}</style>
    </>
  );
};
