import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_DOMAIN,
  AUTH_CLIENT_REDIRECT_URI,
} from '../../shared/constants';

export type AppState = {
  returnTo?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

/**
 * @param {object} props -  Props.
 * @param {JSX.Element} props.children -  Props.
 * @returns {JSX.Element} Auth0ProviderWithHistory.
 */
export function Auth0ProviderWithHistory({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState): void => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={AUTH_CLIENT_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      redirectUri={AUTH_CLIENT_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}>
      {children}
    </Auth0Provider>
  );
}
