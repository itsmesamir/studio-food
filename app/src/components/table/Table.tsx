import React, { useEffect } from "react";
import {
  Row,
  ColumnDef,
  flexRender,
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  InitialTableState,
  getExpandedRowModel,
} from "@tanstack/react-table";
// import { useNavigate  } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";

import Empty from "components/empty";
import Loading from "components/loading";
// import Pagination from "components/common/pagination";

import { joinStrings } from "utils/string";
// import { updateUrl } from "utils/updateUrl";
import { classNames } from "utils/className";
import { parseQuery as parse } from "utils/queryParams";

// import history from '$/utils/history';
import config from "config";
import { Any, DefaultObject } from "types/common";
import { Meta } from "types/pagination";

export const ACTION_ID = "action";

export interface RowProps extends Row<DefaultObject> {
  isExpanded?: boolean;
}

interface Colspan {
  colspanIds: string[];
  startId: string;
  length: number;
}

interface FixedColumns {
  title: string;
  position: string;
  className?: string;
}

interface StyledColumns {
  title: string;
  className: string;
}

type PaginationType = {
  pageData: Meta;
  pageCount: number;
};

type MyTableProps<T> = {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  loading: boolean;
  sorting?: boolean;
  initialState?: InitialTableState; // Need to make easier to use, possibly wrapper.
  selectedRows?: number[];
  linkTo?: (original: T) => string;
  onRowClick?: (row: Row<T>) => void;
  getRowCanExpand?: (row: Row<T>) => boolean;
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  getSubRows?: (row: T) => Any;
  emptyMessage: string;
  emptyTrailing?: JSX.Element | null;
  className?: string;
  classes?: {
    table?: string;
    tableHeader?: string;
    tableBody?: string;
    tableFooter?: string;
    tableHeaderRow?: string;
    tableBodyRow?: (original?: T) => string;
    tableHeaderCell?: string;
    tableBodyCell?: string;
  };
  conditionalClasses?: (original: T) => string;
  loadingClassName?: string;
  emptyClassName?: string;
  parentClassName?: string;
  colSpan?: Colspan;
  showEmpty?: boolean;
  rowExpanded?: (expand?: ExpandedState) => ExpandedState;
  fixedColumns?: FixedColumns[];
  styledColumns?: StyledColumns[];
  onSortCallback?: (name: string, sortOrder: string) => void;
  pagination?: PaginationType;
};

function Table<T>(props: MyTableProps<T>) {
  const {
    data,
    columns,
    loading,
    sorting = true,
    initialState,
    selectedRows,
    linkTo,
    classes,
    className,
    getSubRows,
    onRowClick,
    emptyMessage,
    emptyTrailing,
    emptyClassName,
    getRowCanExpand,
    loadingClassName,
    renderSubComponent,
    conditionalClasses,
    parentClassName,
    colSpan,
    showEmpty = false,
    rowExpanded,
    fixedColumns,
    styledColumns,
    onSortCallback,
    pagination,
  } = props;

  // const history = useNavigate ();

  const sortable = sorting && !loading;
  const isTableEmpty = !data?.length;

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  useEffect(() => {
    const rowExpand = rowExpanded ? rowExpanded(expanded) : {};

    setExpanded(rowExpand);
  }, [rowExpanded?.(expanded)]);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows,
    enableSorting: sortable,
    manualPagination: true,
    initialState,
    getRowCanExpand,
    enableSortingRemoval: false, // Skip reset state in sorting
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const onLinkRowClick = (
    e: React.MouseEvent<HTMLTableRowElement>,
    link: string
  ) => {
    if (e.ctrlKey || e.metaKey) {
      //   window.open(`${window.location.origin}${config.endpoints.vyaguta.okr}${link}`, '_blank');

      return;
    }

    // history.push(link);
  };

  const isRowSelected = (id: number) => {
    return selectedRows?.includes(id);
  };

  // Pagination
  // const onPageChange = (selectedPage: number): void => {
  //   updateUrl({ ...parse(window.location.search), page: selectedPage });
  // };

  // const onPageSizeChange = (selectedSize: number): void => {
  //   updateUrl({
  //     ...parse(window.location.search),
  //     page: 1,
  //     size: selectedSize,
  //   });
  // };

  const showEmptyContent = (!loading && isTableEmpty) || showEmpty;

  return (
    <div className={classNames("overflow-hidden  bg-white", parentClassName)}>
      <div
        className={classNames("overflow-x-auto", className, {
          "overflow-x-hidden": loading,
        })}
      >
        <table
          className={classNames(
            "w-full",
            { "bg-white": !classes?.table },
            classes?.table
          )}
        >
          <thead className={classNames("bg-gray-100/70", classes?.tableHeader)}>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr
                  className={classNames(classes?.tableHeaderRow)}
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    const width = header.getSize().toString();

                    const hasSubHeaders = header.subHeaders?.length > 1;

                    return (
                      <th
                        {...{
                          key: header.id,
                          colSpan: header.colSpan,
                          style: {
                            minWidth: width.concat("px"),
                          },
                        }}
                        className={classNames(
                          `px-4 py-3 text-left`,
                          classes?.tableHeaderCell,
                          {
                            "!min-w-0": header.isPlaceholder,
                            "py-0": header.subHeaders.length,
                          }
                        )}
                      >
                        <div
                          role="button"
                          onKeyUp={() => {}}
                          tabIndex={0}
                          className={classNames(
                            "flex items-center text-gray-1000 font-semibold text-sm",
                            {
                              "cursor-pointer whitespace-nowrap":
                                sortable && header.column.getCanSort(),
                              "text-primary-600":
                                !isTableEmpty &&
                                header.column.getIsSorted() &&
                                !loading,
                              "cursor-default":
                                isTableEmpty || !header.column.getCanSort(),
                              "mt-6 text-xs font-normal": header.column.parent,
                              relative: hasSubHeaders,
                            },
                            classes?.tableHeaderCell
                          )}
                          onClick={(e) => {
                            const toggleSortingHandler =
                              header.column.getToggleSortingHandler();

                            if (
                              toggleSortingHandler &&
                              header.column.getCanSort()
                            ) {
                              toggleSortingHandler(e);

                              if (onSortCallback) {
                                const sortedOrder = header.column.getIsSorted();
                                const callbackSortOrder =
                                  !sortedOrder || sortedOrder === "asc"
                                    ? "DESC"
                                    : "ASC";
                                onSortCallback(
                                  header.column.columnDef.header as string,
                                  callbackSortOrder
                                );
                              }
                            }
                          }}
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={classNames({
                                "absolute top-2": hasSubHeaders,
                              })}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                          {!isTableEmpty &&
                            header.column.getIsSorted() &&
                            !loading &&
                            !header.isPlaceholder && (
                              <FaChevronUp
                                size={12}
                                className={classNames("ml-[2px]", {
                                  "rotate-0":
                                    header.column.getIsSorted() === "asc",
                                  "rotate-180":
                                    header.column.getIsSorted() === "desc",
                                  "absolute right-[100px] top-4": hasSubHeaders,
                                })}
                              />
                            )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          {!loading && !isTableEmpty && (
            <tbody className={classNames(classes?.tableBody)}>
              {table.getRowModel().rows.map((row) => {
                const { id } = row.original as Any;
                const { original } = row as Any;

                return (
                  <>
                    <tr
                      className={classNames(
                        "hover:bg-gray-100 cursor-pointer border-b border-solid border-gray-100",
                        {
                          "bg-tertiary-blue-15": isRowSelected(id),
                        },
                        classes?.tableBodyRow &&
                          classes?.tableBodyRow(original),
                        conditionalClasses && conditionalClasses(row.original)
                      )}
                      key={row.id}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (linkTo) onLinkRowClick(e, linkTo(original));

                        if (onRowClick) onRowClick(row);
                      }}
                    >
                      {row.getVisibleCells().map((cell, index) => {
                        if (
                          colSpan?.colspanIds.includes(cell.column.id) &&
                          original.isColspan
                        ) {
                          return null;
                        }

                        const { accessorKey } = cell.column.columnDef as Any;

                        return (
                          <td
                            colSpan={
                              cell.column.id === colSpan?.startId &&
                              original.isColspan
                                ? colSpan.length
                                : 0
                            }
                            className={classNames(
                              "px-4 py-3 text-sm text-gray-500",
                              {
                                "pr-4": cell.column.id === ACTION_ID,
                              },
                              classes?.tableBodyCell
                            )}
                            key={joinStrings(cell.id, index)}
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        );
                      })}
                    </tr>

                    {row.getIsExpanded() && renderSubComponent && (
                      <tr>
                        <td colSpan={row.getVisibleCells().length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          )}
        </table>

        {loading && (
          <Loading
            hasBackground
            className={classNames("h-80", loadingClassName)}
          />
        )}

        {showEmptyContent && <Empty message={emptyMessage} />}
      </div>

      {/* {pagination && (
        <Pagination
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          pageCount={+pagination.pageCount}
          pageData={pagination.pageData}
        />
      )} */}
    </div>
  );
}

export default Table;
