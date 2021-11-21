import type { NextPage } from "next";
import { Layout } from "../components/Layout/Layout";

export const Home: NextPage = (props) => {
  return (
    <>
      <Layout>
        <div className="Home">
          <h1>Welcome to FocusKeep</h1>
        </div>
      </Layout>

      <style jsx>{`
        .Home {
        }
      `}</style>
    </>
  );
};

export default Home;
