import { FC, PropsWithChildren, ReactNode } from 'react';
import { styled } from '@mui/material/styles';

import { AppBar } from './AppBar/AppBar';
import { Sidebar } from './Sidebar/Sidebar';
import { useSidebar } from './Sidebar/sidebar-hooks';
import { Stack } from '@mui/material';

const MainContent = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(6)
  }
}));

const Main = styled('main')({
  flexGrow: 1,
});

const RootLayout = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

/**
 * @param {PropsWithChildren} props - Props.
 * @param {ReactNode} props.children - Children.
 * @returns {JSX.Element} - Base layout for dashboard.
 */
export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  const [open, openSidebar, closeSidebar] = useSidebar();

  return (
    <RootLayout>
      <AppBar
        open={open}
        onCloseSidebar={closeSidebar}
        onOpenSidebar={openSidebar}
      />
      <Stack direction='row'>
        <Sidebar open={open} />
        <MainContent>
          <Main>{children}</Main>
        </MainContent>
      </Stack>
    </RootLayout>
  );
};
