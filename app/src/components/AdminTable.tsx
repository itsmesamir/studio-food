import React from "react";
import { useTable, useFilters } from "react-table";
import axios from "axios";
import Select from "react-select";

const AdminTable = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Meal Type", accessor: "meal_type" },
      { Header: "Date", accessor: "order_time" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);

  return (
    <div>
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
