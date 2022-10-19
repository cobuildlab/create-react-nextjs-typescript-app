import { ReactElement } from 'react';

import { Loader } from './ui/components/Loader';
import { useSession } from '../../modules/auth/auth-hooks';

type SessionProps = {
  children: ReactElement;
};

/**
 * @param {SessionProps} props - Props.
 * @param {ReactElement}  props.children - Children.
 * @returns {ReactElement} - Session component.
 */
export function Session({ children }: SessionProps): ReactElement {
  const session = useSession();

  if (session?.loading) return <Loader fullPage />;

  // Problems with children type
  // ReacxtNode or ReactElement
  // One solution: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18051#issuecomment-449628575
  // Other solution is change children type to ReactElement
  return children;
}
