import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Tasks } from "./components/Tasks/Tasks";
import { Sidebar } from "./components/Sidebar";

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
          <Sidebar />
        </div>
      </Layout>

      <style jsx>{`
        .Home {
          padding: var(--size-07) var(--size-05);
          display: flex;
          flex-direction: column;
        }

        .Home > :global(* + *) {
          margin-top: var(--size-06);
        }

        @media (min-width: 768px) {
          .Home {
            flex-direction: row;
            flex-grow: 1;
          }

          .Home > :global(* + *) {
            margin-top: 0;
            margin-left: var(--size-06);
          }
        }
      `}</style>
    </>
  );
};

export default Home;
