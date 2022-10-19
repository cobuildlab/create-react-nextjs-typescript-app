import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  split,
  ApolloLink,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import {
  WORKSPACE_ENDPOINT,
  EIGHTBASE_WS_ENDPOINT,
  WORKSPACE_ID,
  ENVIRONMENT_NAME,
} from '../constants';

/**
 * @param {string | undefined} token - Auth Token.
 * @returns {object} Apollo client.
 */
export function createApolloClient(
  token?: string
): ApolloClient<NormalizedCacheObject> {
  const environmentName =
    ENVIRONMENT_NAME &&
    ENVIRONMENT_NAME.length > 0 &&
    ENVIRONMENT_NAME.toLowerCase() !== 'master'
      ? ENVIRONMENT_NAME
      : undefined;

  const ssrMode = typeof window === 'undefined';
  let link: ApolloLink;

  const httpLink = new HttpLink({
    uri: WORKSPACE_ENDPOINT,
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    }
  });

  if(ssrMode) {
    link = httpLink;
  } else {
    const WebSocketImpl = window.WebSocket;

    const wsLink = new WebSocketLink(
      new SubscriptionClient(
        EIGHTBASE_WS_ENDPOINT,
        {
          reconnect: true,
          lazy: true,
          connectionParams: () => {
            return {
              token,
              environmentName,
              workspaceId: WORKSPACE_ID,
            }
          }
        },
        class WebSocketWithoutProtocol extends WebSocketImpl {
          /**
           * @param url - Endpoint of websocket.
           */
          constructor(url: string) {
            super(url); // ignore protocol
          }
        },
      )
    );

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    );

    link = splitLink;
  }

  const client = new ApolloClient({
    uri: WORKSPACE_ENDPOINT,
    link,
    cache: new InMemoryCache(),
  });

  return client;
}
