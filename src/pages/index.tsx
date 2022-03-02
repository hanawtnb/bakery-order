import type { NextPage } from "next";
import Head from "next/head";

import TodaysMenu from "../components/template/TodaysMenu";
import { Header } from "../components/organisms/layout/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Grain de ble</title>
        <meta name="description" content="Grain de bleのパン予約" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <TodaysMenu />
      </main>
    </div>
  );
};

export default Home;
