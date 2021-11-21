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
        <div className="content">{props.children}</div>
        <Footer />
      </div>

      <style jsx>{`
        .Layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .content {
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};
