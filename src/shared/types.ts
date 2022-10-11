export interface QueryResponse<T> {
  loading: boolean;
  error?: Error;
  data?: T;
  refetch: () => void;
}
