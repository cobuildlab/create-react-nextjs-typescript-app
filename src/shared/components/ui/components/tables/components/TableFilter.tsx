import { IconButton as MUIIconButton, Popover } from "@mui/material";
import { FilterList as FilterListIcon } from '@mui/icons-material';
import { styled } from "@mui/material/styles"; 
import { FC, ReactElement } from "react";
import { useTableFilter } from "../table-hooks";



const IconButton = styled(MUIIconButton)({
  borderRadius: '50%',
  border: '1px solid #B2B2B2',
});

const PopoverContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400
}));



interface TableFilterProps {
  componentFilter: ReactElement,
}

export const TableFilter: FC<TableFilterProps> = (props) => {
  const { anchorPopover, closeTableFilter, openTableFilter } = useTableFilter();
  const isOpenPopover = Boolean(anchorPopover);
  const id = isOpenPopover ? 'filters-popover' : undefined;
  const { componentFilter } = props;

  return (
    <>
      <IconButton
        aria-describedby={id}
        size="small"
        onClick={openTableFilter}
      >
        <FilterListIcon />
      </IconButton>
      <Popover
        id={id}
        open={isOpenPopover}
        anchorEl={anchorPopover}
        onClose={closeTableFilter}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PopoverContent>{componentFilter}</PopoverContent>
      </Popover>
    </>
  );
};