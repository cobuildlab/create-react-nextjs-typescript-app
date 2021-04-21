import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ProtectedRoute } from './ProtectedRoute';
import { Auth } from '../modules/auth/Auth';
import { AuthCallback } from '../modules/auth/auth-callback/AuthCallback';
import { Session } from '../modules/session/Session';
import { Logout } from '../modules/auth/Logout';
import {
  useSetupAuth0Token,
  useDefaultRedirect,
} from '../modules/auth/auth-hooks';
import { MainLoader } from '../shared/components/MainLoader';
import { Layout } from '../shared/components/Layout';
import { Dashboard } from '../modules/dashboard/DashboradView';

/*
WARNING: It is not necessary to add a protected route to each component within session, 
an example of how to add the routes I will leave below

  <ProtectedRoute path="/">
    <Session>
     <Route path="/1" component={AuthCallback} />
     <Route path="/2/4" component={AuthCallback} />
     <Route path="/3/5" component={AuthCallback} />
    </Session>
  </ProtectedRoute>

*/

export const Routes: React.FC = () => {
  // const { isLoading, error, isAuthenticated } = useAuth0();

  const loadingToken = useSetupAuth0Token();

  useDefaultRedirect('/dashboard');
  return loadingToken ? (
    <MainLoader />
  ) : (
    <>
      <Switch>
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/auth/callback" component={AuthCallback} />
        <Route path="/logout" component={Logout} />
        <ProtectedRoute path="/">
          <Session>
            <Layout>
              <Route path="/dashboard" component={Dashboard} exact />
            </Layout>
          </Session>
        </ProtectedRoute>
      </Switch>
    </>
  );
};
