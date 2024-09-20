import { ColumnDef } from "@tanstack/react-table";

import { TextCell } from "components/admin/tableCells";
import { User, UserRowData } from "interface/user";
import GenerateQrCell from "./GenerateQrCell";

export const columns = (): Array<ColumnDef<User>> => {
  return [
    {
      header: "User ID",
      accessorKey: "userId",
      cell: ({ row: { original } }: UserRowData) =>
        TextCell(original.id, "capital-text employees__table-text"),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row: { original } }: UserRowData) =>
        TextCell(original.name, "capital-text employees__table-text"),
    },
    {
      header: "Department",
      accessorKey: "department",
      cell: ({ row: { original } }: UserRowData) =>
        TextCell(original.department, "capital-text employees__table-text"),
    },
    {
      header: "Designation",
      accessorKey: "designation",
      cell: ({ row: { original } }: UserRowData) =>
        TextCell(original.designation, "capital-text employees__table-text"),
    },
    {
      header: "Generate QR",
      accessorKey: "generateQr",
      cell: ({ row: { original } }: UserRowData) => GenerateQrCell(original),
    },
  ];
};
