import { useApolloClient, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { tryCatch } from '@cobuildlab/error-handling';
import { useCallback } from 'react';

import { AUTH_PROFILE_ID } from '../../shared/constants';
import { QueryResponse } from '../../shared/types';
import { CURRENT_USER_QUERY, FETCH_SESSION_QUERY, USER_SIGN_UP_MUTATION } from './auth-queries';
import { SessionQuery } from './auth-types';

type AuthHookType = {
  getToken: () => Promise<string | null>;
  handleAuthentication: (email: string) => Promise<void>;
};

/**
 * Hook for returning the User Session.
 *
 * @returns {QueryResponse<SessionQuery>} The response.
 */
export function useSession(): QueryResponse<SessionQuery> | null {
  const { loading, error, data, refetch } =
    useQuery<SessionQuery>(FETCH_SESSION_QUERY);
  return { loading, error, data, refetch };
}

/**
 * Auth hook.
 *
 * @returns {AuthHookType} - Auth state/methods.
 */
export const useAuth = (): AuthHookType => {
  const client = useApolloClient();
  const { getIdTokenClaims } = useAuth0();

  const getToken = useCallback(async () => {
    const token = await getIdTokenClaims();
    // eslint-disable-next-line no-underscore-dangle
    const tokenRaw: string | undefined = token?.__raw;
    return tokenRaw || null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 
   * @param email - User email.
   */
   const handleAuthentication = async (email: string): Promise<void> => {
    const [, error] = await tryCatch(
      client.query({
        query: CURRENT_USER_QUERY,
      })
    );
  
    if (error) {
      await tryCatch(
        client.mutate({
          mutation: USER_SIGN_UP_MUTATION,
          variables: {
            user: { email },
            authProfileId: AUTH_PROFILE_ID,
          },
        })
      );
    }
  };

  return {
    getToken,
    handleAuthentication
  };
};
