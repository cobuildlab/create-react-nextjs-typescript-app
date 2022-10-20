import { NextPage } from 'next';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

import { Loader } from '../src/shared/components/ui/components/Loader';


const HomePage: NextPage = () => {

  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loader fullPage />;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
      </>
    );
  }

  return <Link href='/api/auth/login'>Login</Link>
}

export default HomePage;
