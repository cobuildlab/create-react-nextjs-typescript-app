import { ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import {
  ManageAccountsOutlined as AccountSettingsIcon,
  PowerSettingsNewOutlined as SignoutIcon
} from '@mui/icons-material';
import { FC } from "react";
import { useRouter } from "next/router";

type AppBarMenuProps = {
  anchorMenu: HTMLElement | null,
  onClose: () => void
}

export const AppBarMenu: FC<AppBarMenuProps> = ({ anchorMenu, onClose }) => {
  const router = useRouter();
  const isOpenMenu = Boolean(anchorMenu);

  return (
    <Menu
      anchorEl={anchorMenu}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isOpenMenu}
      onClose={onClose}
    >
      <MenuItem onClick={() => {}}>
        <ListItemIcon>
          <AccountSettingsIcon />
        </ListItemIcon>
        <Typography>Account Settings</Typography>
      </MenuItem>
      <MenuItem onClick={() => router.push('/api/auth/logout')}>
        <ListItemIcon>
          <SignoutIcon />
        </ListItemIcon>
        <Typography>Sign Out</Typography>
      </MenuItem>
    </Menu>
  );
};
