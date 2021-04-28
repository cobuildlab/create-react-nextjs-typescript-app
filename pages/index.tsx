import React, { ReactElement } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import  AuthCallback  from '../src/auth-callback/AuthCallback'

/**
 * @returns {ReactElement} Return a reactElement.
 */
export default function App  (): ReactElement { 
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}