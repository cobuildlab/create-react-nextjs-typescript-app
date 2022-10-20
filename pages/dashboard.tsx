import Link from 'next/link';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { DashboardLayout } from '../src/shared/components/ui/layouts/DashboardLayout';
import { NextPageWithLayout } from '../src/shared/types';


const DashboardPage: NextPageWithLayout = () => {

  const { user  } = useUser();

  if (user) {
    return (
      <>
        Dashboard
      </>
    );
  }

  return null;
}

DashboardPage.layout = DashboardLayout;

export const getServerSideProps = withPageAuthRequired();

export default DashboardPage
