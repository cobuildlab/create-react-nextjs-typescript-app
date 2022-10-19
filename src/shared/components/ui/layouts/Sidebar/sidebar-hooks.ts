import { useState } from 'react';

/**
 * @returns {JSX.Element} - Sidebar hook.
 */
export const useSidebar = (): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState(false);

  /**
   * To open sidebar.
   */
  const openSidebar = (): void => {
    setOpen(true);
  };

  /**
   * To close sidebar.
   */
  const closeSidebar = (): void => {
    setOpen(false);
  };

  return [open, openSidebar, closeSidebar];
};
