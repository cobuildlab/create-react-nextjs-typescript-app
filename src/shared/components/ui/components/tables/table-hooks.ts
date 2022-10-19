import { useState } from 'react';

type TableFilterHookType = {
  anchorPopover: HTMLElement | null;
  openTableFilter: (event: React.MouseEvent<HTMLElement>) => void;
  closeTableFilter: () => void;
};

/**
 * @returns {JSX.Element} - Table Filter hook.
 */
export const useTableFilter = (): TableFilterHookType => {
  const [anchorPopover, setAnchorPopover] = useState<null | HTMLElement>(null);

  /**
   * To open Table filter menu.
   * @param {React.MouseEvent<HTMLElement>} event - Event.
   */
  const openTableFilter = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorPopover(event.currentTarget)
  };

  /**
   * To close Table filter menu.
   */
  const closeTableFilter = (): void => {
    setAnchorPopover(null);
  };

  return {
    anchorPopover,
    openTableFilter,
    closeTableFilter
  };
};
