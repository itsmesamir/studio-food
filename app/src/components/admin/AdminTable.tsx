import TableFilters from "components/table/components/TableFilter";
import Table from "../table/Table";
import { columns } from "./column";
import useFilters from "hooks/useFilter";
import { DefaultFilter, Filters } from "interface/filter";
import { useEffect, useMemo, useState } from "react";
import { FilterType } from "enums/filter";
import { MealType } from "enums/order";
import http from "services/http";
import TableTitle from "components/table/components/TableTitle";
import { parseQuery } from "utils/queryParams";
import { getFormattedDate } from "utils/date";
import { Meta } from "types/pagination";
import { DEFAULT_PAGE_SIZE } from "constants/page";

enum OrderFilterID {
  userIds = "userIds",
  mealTypeIds = "mealType",
  date = "date",
  size = "size",
}

const DEFAULT_FILTERS: DefaultFilter<OrderFilterID> = {
  userIds: null,
  mealType: null,
  date: null,
  size: 10,
};

interface User {
  department: string;
  designation: string;
  email: string;
  id: number;
  name: string;
  roles: string; // Assuming 'roles' is a single role. If it's an array, use 'string[]'
}

const AdminTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pageData, setPageData] = useState<Meta>({
    total: 0,
    page: 0,
    pageSize: 0,
  });
  const [pageCount, setPageCount] = useState<number>(0);

  const [users, setUsers] = useState<User[]>([]);

  const userOptions = useMemo(
    () =>
      users.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      }),
    [users]
  );

  useEffect(() => {
    const fetchData = async () => {
      const res = await http.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setUsers(res.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const param: any = parseQuery(window.location.search);

        const res: any = await http.get("/orders", {
          params: param,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setData(res.data);

        setPageData(res.meta);
        const totalPage = Math.ceil(
          res?.meta.total / (+param?.size || DEFAULT_PAGE_SIZE)
        );

        setPageCount(totalPage);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [window.location.search]);

  const filters: Filters<OrderFilterID>[] = useMemo(
    () => [
      {
        name: "name",
        key: OrderFilterID.userIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: false,
        options: userOptions,
      },
      {
        name: "Meal type",
        key: OrderFilterID.mealTypeIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: false,
        options: [
          {
            label: MealType.BREAKFAST,
            value: MealType.BREAKFAST,
          },
          {
            label: MealType.LUNCH,
            value: MealType.LUNCH,
          },
          {
            label: MealType.DINNER,
            value: MealType.DINNER,
          },
          {
            label: MealType.MIDNIGHT_SNACK,
            value: MealType.MIDNIGHT_SNACK,
          },
        ],
      },

      {
        name: "date",
        key: OrderFilterID.date,
        isFixed: true,
        type: FilterType.Date,
      },
    ],
    [users]
  );

  const { appliedFilters, applyFilters, resetFilters, canResetFilters } =
    useFilters(DEFAULT_FILTERS);

  const downloadCSV = () => {
    const csvRows = [];
    const headers = [
      "Order ID",
      "User ID",
      "Name",
      "Department",
      "Designation",
      "Meal Type",
      "Order Time",
    ];
    csvRows.push(headers.join(","));

    data.forEach((order: Order) => {
      const row = [
        order.id,
        order.user.id,
        order.user.name,
        order.user.department,
        order.user.designation,
        order.mealType,
        getFormattedDate(order.orderTime, "YYYY-MM-DD hh:mm"),
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "orders.csv");
    a.click();
  };

  return (
    <div className="container bg-white mt-6">
      <div className="flex justify-between items-center ">
        <TableTitle
          tableTitle={"Orders"}
          itemName={""}
          start={data.length}
          total={pageData.total}
        />
        <TableFilters<OrderFilterID>
          appliedFilters={appliedFilters}
          onFilterApply={applyFilters}
          filters={filters}
          onFilterReset={resetFilters}
          canResetFilters={canResetFilters}
          isLoading={false}
          className="px-5"
        />
        <button
          onClick={downloadCSV}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Download as CSV
        </button>
      </div>

      <Table<Order>
        loading={loading}
        columns={columns()}
        data={data as any[]}
        getRowCanExpand={() => true}
        emptyMessage="No orders found"
        parentClassName=""
        pagination={{ pageCount, pageData }}
      />
    </div>
  );
};

export default AdminTable;
