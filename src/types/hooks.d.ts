export interface UseAsyncResult<T> {
  loading: boolean;
  error: Error | undefined;
  value: T | undefined;
}

export type UseFetchResult<T> = UseAsyncResult<T>
