import Document, { Html, Head, Main, NextScript } from "next/document";

const APP_NAME = "FocusKeep";
const APP_DESCRIPTION =
  "Track daily work routine with blocks of focused time. Pomodoro technique. Forever free.";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content={APP_NAME} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#FFFFFF" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#FFFFFF" />
          <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
          <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="manifest" href="/manifest.json" />

          <meta name="twitter:card" content={APP_DESCRIPTION} />
          <meta name="twitter:url" content="https://keepfocus.com" />
          <meta name="twitter:title" content={APP_NAME} />
          <meta name="twitter:description" content={APP_DESCRIPTION} />
          <meta name="twitter:image" content="https://keepfocus.com/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@carlosbaraza" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={APP_NAME} />
          <meta property="og:description" content={APP_DESCRIPTION} />
          <meta property="og:site_name" content={APP_NAME} />
          <meta property="og:url" content="https://keepfocus.com" />
          <meta property="og:image" content="https://keepfocus.com/apple-touch-icon.png" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
