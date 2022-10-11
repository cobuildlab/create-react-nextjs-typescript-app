import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { setContext } from '@apollo/client/link/context';
import {
  WORKSPACE_ENDPOINT,
  PROJECT_ID
} from '../constants';

/**
 * @param {object} headers - Extra header to the client.
 * @returns {object} Apollo client.
 */
export function createApolloClient(
  headers = {},
): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: WORKSPACE_ENDPOINT,
  });
  const prefix = PROJECT_ID;

  const authLink = setContext((_, { headers: _headers }) => {
    const token = localStorage.getItem(`${prefix}-token`);
    
    return {
      headers: {
        ...headers,
        ..._headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    authLink.concat(httpLink),
  );

  const client = new ApolloClient({
    uri: WORKSPACE_ENDPOINT,
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
  });
  return client;
}

export const client = createApolloClient();
