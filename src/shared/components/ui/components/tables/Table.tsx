import {
  Table as MUITable,
  TableBody,
  TableCell as MUITableCell,
  TableCellProps as MUITableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { PropsWithChildren, ReactElement } from "react";
import { TableHeader } from "./components/TableHeader";
import { TablePagination } from "./components/TablePagination";
import { TableColumnType } from './table-types';



interface MUITableCellStyledProps extends MUITableCellProps {
  minWidth?: number;
  clickable?: boolean;
}

const TableCell = styled(MUITableCell, {
  /**
   *
   * @param {PropertyKey} prop - Drawer prop.
   * @returns {boolean} - Flag If prop should forwarded.
   */
  shouldForwardProp: (prop) => prop !== 'minWidth' && prop !== 'clickable',
})<MUITableCellStyledProps>(({ minWidth, clickable }) => ({
  ...(minWidth && { minWidth }),
  cursor: clickable? 'pointer' : 'inherit'
}));



type TableProps<T> = {
  columns: readonly TableColumnType<T>[],
  config?: {
    componentHeader?: { show?: boolean},
    pagination?: { show?: boolean },
    table?: { 
      head: { sticky?: boolean }
    },
  },
  componentFilter?: ReactElement,
  componentHeader?: ReactElement,
  componentPagination?: ReactElement,
  componentRightActions?: ReactElement,
  description?: string,
  items: T[];
  onRowClick?: (item: T) => void;
  onPageChange: (value: number) => void;
  onPageSizeChange: (value: number) => void;
  page: number;
  pageSize: number;
  totalItems: number;
};

export const Table = <T extends {id: string}>(props: PropsWithChildren<TableProps<T>>): JSX.Element => {
  const {
    columns,
    config,
    componentFilter,
    componentHeader,
    componentPagination,
    componentRightActions,
    description,
    items,
    onRowClick,
    onPageChange,
    onPageSizeChange,
    page,
    pageSize,
    totalItems
  } = props;

  const tableHead = columns.map((column) => (
    <TableCell
      key={column.id}
      align={column.config?.style?.align}
      minWidth={column.config?.style?.minWidth}
    >
      {column.label}
    </TableCell>
  ));

  const tableBody = items.map((item, i) => {
    const rowIndex = i + 1;
    const columnsData = columns.map((column, i2) => {
      const columnIndex = i2 + 1;
      if (column.value !== null) {
        return (
          <TableCell
            clickable={onRowClick !== undefined}
            key={`table__table-cell--${rowIndex}-${columnIndex}`}
            onClick={() => {
              if (onRowClick) onRowClick(item);
            }}
          >
            {column.format ? column.format(column.value(item)) : column.value(item)}
          </TableCell>
        );
      }
  
      if (column.component){
        return (
          <TableCell
            clickable={onRowClick !== undefined}
            key={`table__table-cell--${rowIndex}-${columnIndex}`}
            onClick={() => {
              if (onRowClick) onRowClick(item);
            }}
          >
            {column.component(item)}
          </TableCell>
        );
      }

      return null;
    });

    return (
      <TableRow
        hover
        // onClick={(event) => handleSelectItem(event, item)}
        // onMouseEnter={(event) => handleMouseEnter(event, item, index)}
        // onMouseLeave={(event) => handleMouseLeave(event, item, index)}
        role="checkbox"
        // aria-checked={isSelected(item.id || '')}
        tabIndex={-1}
        key={`table__table-row--${rowIndex}`}
        // selected={isSelected(item.id || '')}
      >
        {columnsData}
      </TableRow>
    );
  })

  return (
    <>
      {config?.componentHeader?.show && !componentHeader && (
        <TableHeader
          componentFilter={componentFilter}
          componentRightActions={componentRightActions}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
          config={{
            pageSize: {
              show: true
            },
            search: {
              show: true
            }
          }}
        />
      )}
      {config?.componentHeader?.show && componentHeader}
      <TableContainer>
        <MUITable 
          aria-label={description}
          stickyHeader={config?.table?.head?.sticky}
        >
          <TableHead>
            <TableRow>
              {tableHead}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableBody}
          </TableBody>
        </MUITable>
      </TableContainer>
      {config?.pagination?.show && !componentPagination && (
        <TablePagination
          count={totalItems}
          page={page}
          rowsPerPage={pageSize}
          onPageChange={(e, newPage) => onPageChange(newPage)}
        />
      )}
      {config?.pagination?.show && componentPagination}
    </>
  );
};