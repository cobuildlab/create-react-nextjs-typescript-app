import {
  HomeOutlined as HomeIcon,
  SettingsOutlined as SettingsIcon,
} from '@mui/icons-material';
import {
  Divider as MUIDivider,
  Drawer as MUIDrawer,
  List,
  Toolbar
} from '@mui/material';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import { FillSpace } from '../../common/FillSpace';

import { SidebarMenuItem } from './components/SidebarMenuItem';

/**
 *
 * @param {Theme} theme - Mixin for to apply Styles to open.
 * @returns {CSSObject} - CSS Styles.
 */
const openedMixin = (theme: Theme): CSSObject => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

/**
 *
 * @param {Theme} theme - Mixin for to apply Styles to close.
 * @returns {CSSObject} - CSS Styles.
 */
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: 64,
  },
});

const Divider = styled(MUIDivider)(({ theme }) => ({
  borderColor: theme.palette.grey[100],
}));

const DrawerContent = styled('div')({
  overflowY: 'auto',
  overflowX: 'hidden',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const Drawer = styled(MUIDrawer, {
  /**
   *
   * @param {PropertyKey} prop - Drawer prop.
   * @returns {boolean} - Flag If prop should forwarded.
   */
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));



interface SidebarProps {
  open?: boolean;
}

/**
 * @param {SidebarProps} props - Sidebar props.
 * @returns Sidebar Component.
 */
export const Sidebar: React.FC<SidebarProps> = (props) => {
  const { open } = props;
  const selected = true;

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar />
      <Divider />
      <DrawerContent>
        <List>
          <SidebarMenuItem
            title="Home"
            onClick={() => {}}
            selected={selected}
            // onClick={() => {}}
            icon={<HomeIcon />}
          />
        </List>

        <FillSpace />

        <Divider />
        <List>
          <SidebarMenuItem
            title="Settings"
            onClick={() => {}}
            selected={!selected}
            // onClick={() => {}}
            icon={<SettingsIcon />}
          />
        </List>
      </DrawerContent>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  open: false,
};
