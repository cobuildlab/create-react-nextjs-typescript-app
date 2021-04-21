import { useEffect, useState } from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { fetchSession } from './session-actions';
import { OnFetchSession, OnFetchSessionError } from './session-events';
import { MainLoader } from '../../shared/components/MainLoader';

type SessionProps = {
  children: React.ReactNode;
};

/**
 * @param {object} props - Props.
 * @param {JSX.Element}  props.children - Children.
 * @returns {JSX.Element} - Session component.
 */
export function Session({ children }: SessionProps): JSX.Element {
  const [isFetchSession, setFetchSession] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetchSession();
  }, []);

  useSubscription(
    OnFetchSession,
    () => {
      setFetchSession(false);
    },
    [],
  );

  useSubscription(
    OnFetchSessionError,
    () => {
      setError(true);
    },
    [],
  );

  if (isFetchSession) {
    return <MainLoader />;
  }

  // prevents rendering the app if an error has occurred
  if (isError) {
    return <div>something is wrong...</div>;
  }

  return <>{children}</>;
}
