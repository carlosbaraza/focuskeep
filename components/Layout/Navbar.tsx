import React, { FC } from "react";
import { Logo } from "./Logo";

type Props = {};

export const Navbar: FC<Props> = (props) => {
  return (
    <>
      <div className="Navbar">
        <Logo />
      </div>

      <style jsx>{`
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
