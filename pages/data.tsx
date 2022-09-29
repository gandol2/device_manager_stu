import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title={"DATA"}>
      <h2 className="text-3xl font-bold">DATA 페이지 입니다</h2>
    </Layout>
  );
};

export default Home;
