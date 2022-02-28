import type { AppProps } from "next/app";

import "../../styles/index.scss";
import { Header } from "../components/organisms/layout/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
