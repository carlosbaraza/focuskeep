import "dashvar/dist/base.css"; // Optional
import "dashvar/dist/dashvar.css";
import "dashvar/dist/dashvar-helpers"; // Optional for media queries

import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
