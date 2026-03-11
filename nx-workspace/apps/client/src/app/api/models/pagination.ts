export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}

export interface LazyLoadingPagination<T> extends PaginatedResponse<T> {
  hasMore: boolean;
}
