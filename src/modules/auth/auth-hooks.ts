import { useApolloClient, useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import { tryCatch } from '@cobuildlab/error-handling';
import { useCallback } from 'react';

import { AUTH_PROFILE_ID } from '../../shared/constants';
import { useLocalStorage } from '../../shared/hooks/storage';
import { QueryResponse } from '../../shared/types';
import { CURRENT_USER_QUERY, FETCH_SESSION_QUERY, USER_SIGN_UP_MUTATION } from './auth-queries';
import { SessionQuery } from './auth-types';

type AuthHookType = {
  getToken: () => Promise<string | null>;
  handleLogout: () => void
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
  const { logout } = useAuth0();
  const { clearAll } = useLocalStorage();

  const getToken = useCallback(async () => {
    const res = await fetch(`http://localhost:3000/api/auth/token`)
    if (res.ok) {
      const json = await res.json()
      return json.token;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Logout.
   */
   const handleLogout = (): void => {
    clearAll();
    logout({ returnTo: window.location.origin });
  };

  return {
    getToken,
    handleLogout
  };
};
