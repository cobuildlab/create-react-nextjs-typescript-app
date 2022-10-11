import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from './auth-hooks';
import { useLocalStorage } from '../../shared/hooks/storage';

// TODO add loading component
/**
 * 
 * @returns {JSX.Element} - Auth callback component.
 */
export default function AuthCallback(): JSX.Element {
  const { init, setItem } = useLocalStorage();
  const { getToken, handleAuthentication } = useAuth();
  const auth = useUser();
  const { user, checkSession } = auth;
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    if (checkSession) {
      // init local storage
      init();

      getToken().then((token) => {
        if (token && user) {
          setItem('token', token);

          handleAuthentication(user.email as string).finally(() =>
            navigate(state.returnTo || '/')
          );
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken, checkSession]);

  // NOT ADD LOADING COMPONENT HERE this must be a loading auth component
  return <div>authenticated....</div>;
}
