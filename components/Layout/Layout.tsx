import React, { FC } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = {};

export const Layout: FC<Props> = (props) => {
  return (
    <>
      <div className="Layout">
        <header>
          <Navbar />
        </header>
        <div className="content">
          <div className="inner">{props.children}</div>
        </div>
        <Footer />
      </div>

      <style jsx>{`
        .Layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          width: 100%;
        }

        .content {
          display: flex;
          justify-content: center;
          flex-grow: 1;
          background: var(--gray-100);
        }

        .inner {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          max-width: var(--size-16);
        }
      `}</style>
    </>
  );
};
