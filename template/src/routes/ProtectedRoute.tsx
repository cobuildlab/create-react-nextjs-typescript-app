import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
