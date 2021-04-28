import React, { useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import {
  CURRENT_USER_QUERY,
  USER_SIGN_UP_MUTATION,
} from './auth-callback-queries';
import { AUTH_PROFILE_ID } from '../constants';
// import { OnTokenEvent } from '../../events/token-event';
import { useSetupAuth0Token } from '../auth/auth-hooks';

// TODO add loading component
/**
 * 
 * @returns {JSX.Element} - Auth callback component.
 */
export default function AuthCallback(): JSX.Element {
  const client = useApolloClient();

  const auth = useUser();

  const { user, checkSession } = auth;

  useSetupAuth0Token();

  useEffect(() => {
    const handleAuthentication = async (): Promise<void> => {
      const { name } = user;
      try {
        await client.query({
          query: CURRENT_USER_QUERY,
        });
      } catch (error) {
        await client.mutate({
          mutation: USER_SIGN_UP_MUTATION,
          variables: {
            user: { name },
            authProfileId: AUTH_PROFILE_ID,
          },
        });
      }
    };

    if (checkSession) {
      // history.push('/');
      handleAuthentication();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkSession]);

  // NOT ADD LOADING COMPONENT HERE this must be a loading auth component
  return <div>authenticated....</div>;
}
