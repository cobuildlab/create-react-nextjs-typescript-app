import React from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import { ApolloProvider } from '../src/apollo/ApolloProvider';

/**
 * 
 * @param {AppProps} prop - Props.
 * @param {AppProps} prop.Component - Component.
 * @param {AppProps} prop.pageProps - PageProps.
 * @returns {JSX.Element} - Main app component.
 */
function App({ Component, pageProps }: AppProps):JSX.Element {
  return (
    <UserProvider>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default App;
