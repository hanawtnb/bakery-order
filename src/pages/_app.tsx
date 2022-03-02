import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "../../graphql/apollo";

import "../../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
