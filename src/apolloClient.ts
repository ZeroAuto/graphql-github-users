import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Create an HttpLink to your GraphQL API
const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

// Set up authorization header with ACCESS_TOKEN from environment variables
const authLink = setContext(() => {
  const token = process.env.REACT_APP_ACCESS_TOKEN;
  console.log(token);
  return {
    headers: {
      Authorization: token ? `bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
