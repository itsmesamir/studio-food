export interface PaginationProps {
  offset: number;
  limit: number;
}

export interface PageProps {
  page: number;
  size: number;
}

export interface Meta {
  page: number;
  pageSize: number;
  total: number;
  count?: number;
}
