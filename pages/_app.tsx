import "dashvar/dist/base.css"; // Optional
import "dashvar/dist/dashvar.css";
import "dashvar/dist/dashvar-helpers"; // Optional for media queries

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
