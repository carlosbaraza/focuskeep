import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Tasks } from "../components/Tasks/Tasks";

export const Home: NextPage = (props) => {
  return (
    <>
      <Head>
        <title>FocusKeep | Track daily work habits</title>
        <meta
          name="description"
          content="Track daily work routine with blocks of focused time. Pomodoro technique. Forever free."
        />
      </Head>

      <Layout>
        <div className="Home">
          <Tasks />
        </div>
      </Layout>

      <style jsx>{`
        .Home {
          padding: var(--size-05);
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
      `}</style>
    </>
  );
};

export default Home;
