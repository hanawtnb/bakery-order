import type { AppProps } from "next/app";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { LocalStorageWrapper, persistCache } from "apollo3-cache-persist";

import client from "../../graphql/apollo";
import "../../styles/globals.scss";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

const httpLink = createHttpLink({
  uri: `${config.api}/graphql`,
});
const cache = new InMemoryCache();

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (typeof window !== "undefined") {
    persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
    });
  }

  const client = new ApolloClient({
    link: httpLink,
    cache,
  });
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
