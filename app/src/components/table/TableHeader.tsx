import React from "react";
import classNames from "clsx";

interface TableHeaderProps {
  label: string;
  identifier: string;
  columnToSortBy: string;
  isAscendingOrdered: boolean;
  onClick: () => void;
}

function TableHeader(props: React.PropsWithChildren<TableHeaderProps>) {
  const { label, identifier, columnToSortBy, isAscendingOrdered, onClick } =
    props;
  const highlightColumn = identifier === columnToSortBy;

  return (
    <div
      className={classNames({
        "cursor-pointer": columnToSortBy,
        "color-tertiary-primary-40 lf-table__col--sortable": highlightColumn,
      })}
      onClick={onClick}
    >
      {label}
      {highlightColumn ? (
        <span>
          <span
            className={classNames("triangle", {
              "triangle--up": isAscendingOrdered,
            })}
          />
        </span>
      ) : null}
    </div>
  );
}

export default TableHeader;
