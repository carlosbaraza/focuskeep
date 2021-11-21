import type { NextPage } from "next";
import { Layout } from "../components/Layout/Layout";
import { Tasks } from "../components/Tasks/Tasks";

export const Home: NextPage = (props) => {
  return (
    <>
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
