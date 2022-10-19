import { useState } from 'react';

type AppBarHookType = {
  anchorMenu: HTMLElement | null;
  openMenuAppBar: (event: React.MouseEvent<HTMLElement>) => void;
  closeMenuAppBar: () => void;
};

/**
 * @returns {JSX.Element} - AppBar hook.
 */
export const useAppBar = (): AppBarHookType => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  /**
   * To open AppBar menu.
   * @param {React.MouseEvent<HTMLElement>} event - Event.
   */
  const openMenuAppBar = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorMenu(event.currentTarget)
  };

  /**
   * To close AppBar menu.
   */
  const closeMenuAppBar = (): void => {
    setAnchorMenu(null);
  };

  return {
    anchorMenu,
    openMenuAppBar,
    closeMenuAppBar
  };
};
