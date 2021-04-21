import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import {
  CURRENT_USER_QUERY,
  USER_SIGN_UP_MUTATION,
} from './auth-callback-queries';
import { AUTH_PROFILE_ID } from '../../../shared/constants';
// import { OnTokenEvent } from '../../events/token-event';
import { useSetupAuth0Token } from '../auth-hooks';

// TODO add loading component
/**
 * @param {object} props - Props.
 * @param {object} props.history - History of rect router.
 * @returns {JSX.Element} - Auth callback component.
 */
export function AuthCallback({ history }: RouteComponentProps): JSX.Element {
  const client = useApolloClient();

  const auth = useAuth0();

  const { user, isAuthenticated } = auth;

  useSetupAuth0Token();

  useEffect(() => {
    const handleAuthentication = async (): Promise<void> => {
      const { email } = user;
      try {
        await client.query({
          query: CURRENT_USER_QUERY,
        });
      } catch (error) {
        await client.mutate({
          mutation: USER_SIGN_UP_MUTATION,
          variables: {
            user: { email },
            authProfileId: AUTH_PROFILE_ID,
          },
        });
      }
    };

    if (isAuthenticated) {
      history.push('/');
      handleAuthentication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // NOT ADD LOADING COMPONENT HERE this must be a loading auth component
  return <div>authenticated....</div>;
}
