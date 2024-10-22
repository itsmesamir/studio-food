import React from "react";
import classNames from "classnames";

import { parseQuery as parse } from "utils/queryParams";

import { DefaultObject } from "types/common";

import {
  DEFAULT_PAGE,
  PAGE_SIZE_OPTIONS,
  DEFAULT_PAGE_SIZE,
  MINIMUM_PAGE_COUNT,
  DEFAULT_PAGE_LENGTH,
} from "constants/page";
import { Meta } from "types/pagination";

interface PaginationProps {
  pageData: Meta;
  pageCount: number;
  onPageChange: (selectedPage: number) => void;
  onPageSizeChange: (selectedSize: number) => void;
}

function Pagination(props: PaginationProps) {
  const { pageData, pageCount, onPageChange, onPageSizeChange } = props;

  const activePage = pageData.page || DEFAULT_PAGE;
  const queryParam: DefaultObject = parse(window.location.search);
  const pageSize = queryParam.size || DEFAULT_PAGE_SIZE;

  const changePage = (selectedPage: number): void => {
    onPageChange(selectedPage);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    console.log("hello", +event.currentTarget.value);
    onPageSizeChange(+event.currentTarget.value);
  };

  const onButtonClick = (disabled: boolean, pageValue: number) => {
    if (disabled) {
      return;
    }

    changePage(pageValue);
  };

  const isFirstButtonDisabled = activePage === MINIMUM_PAGE_COUNT;
  const isPrevButtonDisabled = activePage === MINIMUM_PAGE_COUNT || !pageCount;
  const isNextButtonDisabled = activePage === pageCount || !pageCount;
  const isLastButtonDisabled = activePage === pageCount || pageCount <= 1;

  return (
    <div className="p-4">
      <div className="flex gap-x-4 items-center justify-between">
        <div className="flex gap-x-4">
          <button
            type="button"
            className={classNames(
              "bg-blue-500 text-white h-9 rounded w-14  border border-solid border-gray-200",
              {
                "": isFirstButtonDisabled,
              }
            )}
            onClick={() =>
              onButtonClick(isFirstButtonDisabled, MINIMUM_PAGE_COUNT)
            }
            disabled={isFirstButtonDisabled}
          >
            {"<<"}
          </button>

          <button
            type="button"
            className={classNames(
              "bg-blue-500 text-white h-9 rounded w-14  border border-solid border-gray-200",
              {
                "text-gray-900 bg-gray-300": isPrevButtonDisabled,
              }
            )}
            onClick={() => onButtonClick(isPrevButtonDisabled, activePage - 1)}
            disabled={isPrevButtonDisabled}
          >
            {"<"}
          </button>

          <button
            type="button"
            className={classNames(
              "bg-blue-500 text-white h-9 rounded w-14  border border-solid border-gray-200",
              {
                "text-gray-900 bg-gray-300": isNextButtonDisabled,
              }
            )}
            onClick={() => onButtonClick(isNextButtonDisabled, activePage + 1)}
            disabled={isNextButtonDisabled}
          >
            {">"}
          </button>

          <button
            type="button"
            className={classNames(
              "bg-blue-500 text-white h-9 rounded w-14  border border-solid border-gray-200",
              {
                "bg-blue-500 text-white h-9 rounded w-14 text-black--active":
                  isLastButtonDisabled,
                "text-gray-900 bg-gray-100": pageCount <= DEFAULT_PAGE,
              }
            )}
            onClick={() => onButtonClick(isLastButtonDisabled, pageCount)}
            disabled={isLastButtonDisabled}
          >
            {">>"}
          </button>
        </div>

        <div className="flex gap-x-4">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="outline-none border-gray-300 rounded"
          >
            {PAGE_SIZE_OPTIONS.map((pageSizeOption) => (
              <option
                className="text-gray-900 "
                key={pageSizeOption}
                value={pageSizeOption}
              >
                Show {pageSizeOption}
              </option>
            ))}
          </select>

          <span className="lf-table__pagination-status">
            {"Page "}
            <strong>
              {activePage} of {pageCount || DEFAULT_PAGE_LENGTH}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
