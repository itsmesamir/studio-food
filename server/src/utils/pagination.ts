import { PageProps, PaginationProps } from '@/types/pagination';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/pagination';

export function getPaginationOptions(options: PageProps): PaginationProps {
  const { page = DEFAULT_PAGE, size = DEFAULT_PAGE_SIZE } = options;

  const offset = (page - 1) * size;

  return {
    limit: size,
    offset,
  };
}

export function buildMeta(total: number, size: number, page?: number): Record<string, number> {
  return {
    total,
    size,
    page: page || DEFAULT_PAGE,
  };
}
