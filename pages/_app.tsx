import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { ApolloProvider } from '../src/shared/apollo/provider';
import { theme } from '../src/shared/styles/theme';
import '../src/shared/styles/globals.css';

/**
 * 
 * @param {AppProps} prop - Props.
 * @param {AppProps} prop.Component - Component.
 * @param {AppProps} prop.pageProps - PageProps.
 * @returns {JSX.Element} - Main app component.
 */
function App({ Component, pageProps }: AppProps):JSX.Element {
  return (
    <>
      <CssBaseline />
      <UserProvider>
        <ApolloProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  );
}

// eslint-disable-next-line import/no-default-export
export default App;
