import moment from "moment";
import { CellContext, ColumnDef } from "@tanstack/react-table";

import { TextCell } from "./tableCells";

export const columns = (): Array<ColumnDef<Order>> => {
  return [
    {
      header: "S/N",
      accessorKey: "sn",
      size: 10,
      enableSorting: false,
      enableColumnFilter: false,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(props.row.index + 1),
    },
    {
      header: "User ID",
      accessorKey: "userId",
      size: 20,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.user.id,
          "capital-text employees__table-text"
        ),
    },
    {
      header: "Name",
      accessorKey: "name",
      size: 150,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.user.name,
          "capital-text employees__table-text"
        ),
    },
    {
      header: "Department",
      accessorKey: "department",
      size: 100,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.user.department,
          "capital-text employees__table-text"
        ),
    },
    {
      header: "Designation",
      accessorKey: "designation",
      size: 100,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.user.designation,
          "capital-text employees__table-text"
        ),
    },
    {
      header: "Meal Type",
      accessorKey: "mealType",
      size: 125,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          props.row.original.mealType,
          "capital-text employees__table-text"
        ),
    },
    {
      header: "Order Time",
      accessorKey: "orderTime",
      size: 150,
      cell: (props: CellContext<Order, unknown>) =>
        TextCell(
          moment(props.row.original.orderTime).format("YYYY-MM-DD hh:mm A"),
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
