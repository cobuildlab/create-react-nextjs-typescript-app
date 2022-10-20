import { ReactElement } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { Loader } from './ui/components/Loader';

type SessionProps = {
  children: ReactElement;
};

/**
 * @param {SessionProps} props - Props.
 * @param {ReactElement}  props.children - Children.
 * @returns {ReactElement} - Session component.
 */
export function Session({ children }: SessionProps): ReactElement {
  const { isLoading } = useUser();

  if (isLoading) return <Loader fullPage />;

  // Problems with children type
  // ReacxtNode or ReactElement
  // One solution: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
  // Other solution is change children type to ReactElement
  return children;
}
