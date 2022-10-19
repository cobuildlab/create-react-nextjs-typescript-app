import { useLazyQuery } from "@apollo/client";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEffect } from "react";
import { Table } from "../../../shared/components/ui/components/tables/Table";
import { TableColumnType } from "../../../shared/components/ui/components/tables/table-types";

import { usePagination } from "../../../shared/hooks/pagination";
import { get8basePaginateParamsByPage } from "../../../shared/utils/8base";
import { INVOICES_LIST_QUERY } from "../position-queries";
import { TableFilterPosition } from "./TablePositionFilter";


interface Data {
  id: string;
  invoiceId: string;
  invoiceDate: string;
  status: string;
  tax: number;
  total: number;
}

const columns: readonly TableColumnType<Data>[] = [
  {
    id: 'invoiceId',
    label: 'Invoice ID',
    value: (item) => item.invoiceId,
    config:{
      style: {
        minWidth: 170 
      }
    }
  },
  {
    id: 'invoiceDate',
    label: 'Invoice Date',
    value: (item) => item.invoiceDate,
    config: {
      style: {
        minWidth: 100
      }
    }
  },
  {
    id: 'status',
    label: 'Status',
    value: (item) => item.status,
    // format: (value: number) => value.toLocaleString('en-US'),
    config: {
      style: {
        minWidth: 170,
        // align: 'right'
      }
    }
  },
  {
    id: 'tax',
    label: 'Tax',
    value: (item) => item.tax,
    // format: (value: number) => value.toLocaleString('en-US'),
    config: {
      style: {
        minWidth: 170,
        // align: 'right'
      }
    }
  },
  {
    id: 'total',
    label: 'Total',
    value: (item) => item.total,
    // format: (value: number) => value.toFixed(2),
    config: {
      style: {
        minWidth: 170,
        // align: 'right'
      }
    }
  }
];

export const TablePosition = () => {
  const [fetchInvoices, { data, called, loading }] = useLazyQuery(INVOICES_LIST_QUERY);
  const [{ page, pageSize}, onPageChange] = usePagination({ defaultPage: 1, defaultPageSize: 12});

  useEffect(() => {
    const { skip, first } = get8basePaginateParamsByPage(page, pageSize);
    fetchInvoices({ variables: { skip, first }});
  }, [page, pageSize]);

  return (
    <>
    <Table
      columns={columns}
      componentFilter={
        <TableFilterPosition />
      }
      componentRightActions={
        <Button
          size="large"
          startIcon={ <AddIcon />}
          variant='contained'
        >
          New Position
        </Button>
      }
      config={{
        componentHeader: { show: true },
        pagination: { show: true },
        table: { head: { sticky: true }}
      }}
      items={data?.invoicesList?.items || []}
      page={page}
      pageSize={pageSize}
      onPageChange={(newPage) => onPageChange({ page: newPage })}
      onPageSizeChange={(newPageSize) => onPageChange({ pageSize: newPageSize })}
      totalItems={data?.invoicesList?.count || 0}
    />
    </>
  );
};
