import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import {
  IconButton,
  TablePagination as MuiTablePagination,
  TablePaginationProps,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';



const ContainerActions = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0
});

const StyledWrapperPagination = styled('div')({
  display: 'flex',
  justifyContent: 'center'
});

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

/**
 *
 * @param {TablePaginationActionsProps} props - Props.
 * @returns {JSX.Element} TablePaginationActions.
 */
function TablePaginationActions(
  props: TablePaginationActionsProps,
): JSX.Element {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const from = count === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const to =
    count !== -1 ? Math.min(count, page * rowsPerPage) : page * rowsPerPage;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage)));
  };

  return (
    <ContainerActions>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
      <Typography>
        {from}-{to} of {count}
      </Typography>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage)}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </ContainerActions>
  );
}

export const TablePagination: React.FC<TablePaginationProps> = (props) => {
  const { count, rowsPerPage, page, onPageChange } = props;

  return (
    <StyledWrapperPagination>
      <MuiTablePagination
        component='div'
        rowsPerPageOptions={[]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={count ? page : 0}
        onPageChange={onPageChange}
        ActionsComponent={TablePaginationActions}
        labelDisplayedRows={() => null}
      />
    </StyledWrapperPagination>
  );
};
