import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';

import { ApolloProvider } from '../src/shared/apollo/ApolloProvider';
import '../styles/globals.css';

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
