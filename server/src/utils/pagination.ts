import { Meta, PageProps, PaginationProps } from '@/types/pagination';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/pagination';

export function getPaginationOptions(options: PageProps): PaginationProps {
  const { page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = options;

  const offset = (page - 1) * size;

  return {
    limit: size,
    offset,
  };
}

export function getMeta(pageParams: PageProps, count: number): Meta {
  return {
    page: pageParams.page,
    pageSize: pageParams.size,
    total: count,
  };
}
