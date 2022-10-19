
import { ApolloProvider as BaseApolloProvider } from '@apollo/client';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createApolloClient } from './client';

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string>();
  const [client, setClient] = useState(createApolloClient());

  const requestAccessToken = async (): Promise<string | undefined> => {
    const res = await fetch(`http://localhost:3000/api/auth/token`)
    if (res.ok) {
      const json = await res.json()
      return json.token;
    } 
  }

  useEffect(() => {
    requestAccessToken().then((newToken) => {
      if (newToken) setToken(newToken);
    })
  }, []);

  useEffect(() => {
    if(token) setClient(createApolloClient(token));
  }, [token]);

  return (
    <BaseApolloProvider client={client}>
      {children} 
    </BaseApolloProvider>
  );
}