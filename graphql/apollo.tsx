// import getConfig from "next/config";
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const { publicRuntimeConfig: config } = getConfig();

// const client = new ApolloClient({
//   uri: `${config.api}/graphql`,
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

const httpLink = createHttpLink({
  uri: `${config.api}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
export default client;
