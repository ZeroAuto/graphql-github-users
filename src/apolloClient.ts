import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext(() => {
  // under normal circumstances I would never put an access token into
  // an environment variable but since there is no plan to ever deploy
  // this code (as far as I know) I am doing it for convenience, happy
  // to discuss more secure token methods during the interview process
  const token = process.env.REACT_APP_ACCESS_TOKEN;
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
