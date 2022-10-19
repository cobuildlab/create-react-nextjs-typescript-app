import { FC } from 'react';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  Badge,
  ButtonBase,
  Divider as MUIDivider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { FillSpace } from '../../common/FillSpace';
import { Avatar } from '../../components/Avatar';
import { useAppBar } from './appbar-hooks';
import { AppBarMenu } from './components/AppBarMenu';



const ActionIconButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'center',
  color: theme.palette.primary.main
}));

const ContainerActions = styled(Stack)({
  height: '100%',
  flexDirection: 'row'
});

const ContainerProfileButton = styled(Stack)({
  alignItems: 'center'
});

const ContainerUserName = styled(Stack)({
  alignItems: 'flex-start',
  marginLeft: '0.8125rem'
});

const Divider = styled(MUIDivider)(({ theme }) => ({
  borderColor: theme.palette.secondary.light,
  marginRight: '2rem',
  marginLeft: '2rem'
}));

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.grey[400],
  marginRight: theme.spacing(2),
}));

const TextUserName = styled(Typography)(({theme}) => ({
  ...theme.typography.body1,
  color: theme.palette.secondary.main
}));

const TextRole = styled(Typography)(({theme}) => ({
  ...theme.typography.body2,
  color: theme.palette.primary.main
}));

interface MUIAppBarStyledProps extends MUIAppBarProps {
  open?: boolean;
}

const MUIAppBarStyled = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MUIAppBarStyledProps>(({ theme, open }) => ({
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${64}px)`,
    },
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



type AppBarProps = {
  open: boolean;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
  position?: MUIAppBarProps['position']
};

/**
 * @param {AppBarProps} props - Props.
 * @param {boolean} props.open - Flag showing if sidebar is opened.
 * @param {() => void} props.onOpenSidebar - OpenSidebar.
 * @returns {JSX.Element} - Main App bar.
 */
export const AppBar: FC<AppBarProps> = ({
  open,
  onOpenSidebar,
  onCloseSidebar,
  position = 'fixed'
}) => {
  const { anchorMenu, closeMenuAppBar, openMenuAppBar } = useAppBar();

  return (
    <>
      <MUIAppBarStyled position={position} open={open}>
        <Toolbar>

          <MenuIconButton
            size="large"
            edge="start"
            aria-label="open drawer"
            onClick={open ? onCloseSidebar : onOpenSidebar}
          >
            <MenuIcon />
          </MenuIconButton>

          <Typography
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DASHBOARD
          </Typography>

          <FillSpace />

          <ContainerActions sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <ActionIconButton aria-label="Show 4 new notifications">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </ActionIconButton>
          </ContainerActions>

          <Divider orientation="vertical" flexItem />

          <ContainerProfileButton direction='row' spacing={3}>
            <ButtonBase onClick={() => {}}>
              <Stack direction='row'>
                <Avatar
                  alt=''
                  src='https://i.pravatar.cc/150?img=3'
                />
                <ContainerUserName sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <TextUserName>
                    Angel Lacret
                  </TextUserName>
                  <TextRole>
                    Administrator
                  </TextRole>
                </ContainerUserName>
              </Stack>
            </ButtonBase>
            <ActionIconButton onClick={openMenuAppBar}>
              <ArrowDropDownIcon />
            </ActionIconButton>
            <AppBarMenu
              anchorMenu={anchorMenu}
              onClose={closeMenuAppBar}
            />
          </ContainerProfileButton>

        </Toolbar>
      </MUIAppBarStyled>

      {/*
        (Only for position=fixed) Offset to prevent content from being invisible,
        behind the top bar. Sticky could be used but is not supported in ie11.
        https://mui.com/components/app-bar/#fixed-placement
      */}
      {position === 'fixed' && <Toolbar />}
    </>
  );
};
