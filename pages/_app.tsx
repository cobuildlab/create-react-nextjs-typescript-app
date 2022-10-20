import { PropsWithChildren } from 'react';
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { ApolloProvider } from '../src/shared/apollo/provider';
import { theme } from '../src/shared/styles/theme';
import { NextPageWithLayout } from '../src/shared/types';
import '../src/shared/styles/globals.css';

/**
 * 
 * @param {AppProps} prop - Props.
 * @param {AppProps} prop.Component - Component.
 * @param {AppProps} prop.pageProps - PageProps.
 * @returns {JSX.Element} - Main app component.
 */
function App({ Component, pageProps }: AppProps):JSX.Element {
  const Layout = (Component as NextPageWithLayout).layout || ((props: PropsWithChildren) => <>{props.children}</>)

  return (
    <>
      <CssBaseline />
      <UserProvider>
        <ApolloProvider>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}

export default App;
