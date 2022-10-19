import { gql } from '@apollo/client';

export const INVOICES_LIST_QUERY = gql`
  query InvoicesList(
    $filter: InvoiceFilter
    $skip: Int
    $first: Int
    $orderBy: [InvoiceOrderBy]
  ) {
    invoicesList(
      filter: $filter
      skip: $skip
      first: $first
      orderBy: $orderBy
    ) {
      items {
        id
        invoiceId
        invoiceDate
        status
        customer {
          id
          name
        }
        tax
        total
        archivedAt
      }
      count
    }
  }
`;
