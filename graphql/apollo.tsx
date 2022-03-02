import getConfig from "next/config";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const { publicRuntimeConfig: config } = getConfig();

const client = new ApolloClient({
  uri: `${config.api}/graphql`,
  cache: new InMemoryCache(),
});

export default client;
