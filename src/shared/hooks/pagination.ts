import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  defaultPage?: number | undefined;
  defaultPageSize?: number | undefined;
};

export type OnChangeParams = {
  page?: number;
  pageSize?: number;
};

/**
 * @param {number} defaultPage  - Default page to render.
 * @returns {[number,Function]} - State tuple.
 */
export function usePagination({
  defaultPage = 0,
  defaultPageSize = 10,
}: Props = {}): [
  { page: number; pageSize: number },
  (n: OnChangeParams) => void,
] {
  // const location = useLocation();
  // const navigate = useNavigate();

  const [page, setPage] = useState(() => {
    const query = new URLSearchParams(location.search);
    const currentPage = query.get('page')
      ? Number(query.get('page'))
      : defaultPage;
    const currentPageSize = query.get('pageSize')
      ? Number(query.get('pageSize'))
      : defaultPageSize;

    return {
      page: currentPage,
      pageSize: currentPageSize,
    };
  });

  /**
   * @param value - Params.
   */
  const onChange = (value: OnChangeParams): void => {
    const query = new URLSearchParams(location.search);
    if (typeof value.page === 'number') {
      query.set('page', value.page.toString());
    }
    if (typeof value.pageSize === 'number') {
      query.set('pageSize', value.pageSize.toString());
    }

    // const push = {
    //   pathname: location.pathname,
    //   search: query.toString(),
    // };
    // navigate(push);

    setPage((prev) => ({ ...prev, ...value }));
  };
  return [page, onChange];
}
