import { InputAdornment, Stack, TextField } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { FC, ReactElement, useState } from "react";

import { FillSpace } from "../../../common/FillSpace";
import { SelectPageSize } from "./SelectPageSize";
import { TableFilter } from "./TableFilter";



const ContainerTableHeader = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  padding: theme.spacing(3)
}));

const SearchTextField = styled(TextField)({
  minWidth: 240
});

export interface TableHeaderProps {
  componentFilter?: ReactElement,
  componentRightActions?: ReactElement;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
  onSearchChange?: (value: string) => void;
  filters?: Record<string, string | number | null>;
  onFiltersChange?: (values: Record<string, string | number | null>) => void;
  filtersComponent?: ReactElement;
  config?: {
    search?: {
      fullWidth?: boolean,
      show?: boolean,
      placeholder?: string
    },
    pageSize?: { show? : boolean}
  };
}

export const TableHeader: FC<TableHeaderProps> = (props) => {
  const {
    componentFilter,
    componentRightActions,
    config,
    onPageSizeChange,
    onSearchChange,
    pageSize
  } = props;

  const [search, setSearch] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  return (
    <ContainerTableHeader direction='row' spacing='20px'>
      {config?.search?.show && (
        <SearchTextField
          size='small'
          placeholder={config?.search?.placeholder || 'Search'}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value === '' && searchPerformed) {
              if(onSearchChange) onSearchChange('');
              setSearchPerformed(false);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if(onSearchChange) onSearchChange(search);
              setSearchPerformed(true);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}

        />
      )}

      {config?.pageSize?.show && (
        <SelectPageSize
          size="small"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
          }}
        />
      )}

      {componentFilter && (
        <TableFilter
          componentFilter={componentFilter}
        />
      )}

      <FillSpace />

      {componentRightActions}
    </ContainerTableHeader>
  );
};