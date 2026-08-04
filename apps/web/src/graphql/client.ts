import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

console.log("GraphQL Endpoint:", process.env.NEXT_PUBLIC_GRAPHQL_URL)

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});