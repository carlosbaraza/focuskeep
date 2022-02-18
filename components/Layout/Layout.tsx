import React, { FC } from "react";
import { LogoProvider } from "../common/LogoProvider";
import { Container } from "./Container";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type Props = {};

export const Layout: FC<Props> = (props) => {
  return (
    <>
      <LogoProvider>
        <div className="Layout">
          <header>
            <Navbar />
          </header>
          <div className="content">
            <div className="inner">{props.children}</div>
            <div className="sidebar"></div>
          </div>

          <Footer />
        </div>
      </LogoProvider>

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
          max-width: var(--size-17);
        }
      `}</style>
    </>
  );
};
