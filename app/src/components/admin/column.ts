import { CellContext, ColumnDef } from "@tanstack/react-table";

import { TextCell } from "./tableCells";

export const columns = (): Array<ColumnDef<Order>> => {
  return [
    {
      header: "S/N",
      accessorKey: "sn",
      size: 56,
      enableSorting: false,
      enableColumnFilter: false,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(props.row.index + 1),
    },

    {
      header: "Name",
      accessorKey: "name",
      size: 325,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(props.row.original.name, "capital-text employees__table-text"),
    },

    {
      header: "MealType",
      accessorKey: "mealType",
      size: 325,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.mealType,
          "capital-text employees__table-text"
        ),
    },

    {
      header: "OrderTime",
      accessorKey: "orderTime",
      size: 325,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.orderTime,
          "capital-text employees__table-text"
        ),
    },

    // {
    //   header: " ",
    //   accessorKey: "actions",
    //   size: 60,
    //   maxSize: 60,
    //   cell: ({ row }: { row: Any }) => {
    //     const ActionOption = () => [
    //       {
    //         name: "Edit roles",
    //         icon: FiEdit,
    //         state: (rowData: Order) => {
    //           console.log(rowData);
    //         },
    //       },

    //       {
    //         name: "Delete roles",
    //         className: "text-red-500",
    //         icon: FiTrash,
    //         state: (rowData: Order) => {
    //           console.log(rowData);
    //           setDeleteModalOpenFor(rowData);
    //         },
    //         // state: (rowData: Order) => setDeleteModalOpenFor(rowData?.id),
    //       },
    //     ];

    //     return ActionCell({ row }, ActionOption as Any);
    //   },
    // },
  ];
};
