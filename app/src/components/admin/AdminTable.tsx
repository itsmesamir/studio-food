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

enum OrderFilterID {
  userIds = "userIds",
  mealTypeIds = "mealType",
  date = "date",
}

const DEFAULT_FILTERS: DefaultFilter<OrderFilterID> = {
  userIds: null,
  mealType: null,
  date: null,
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
      const param = parseQuery(window.location.search);

      const res = await http.get("/orders", {
        params: param,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(res.data);
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
        isMulti: true,
        options: userOptions,
      },
      {
        name: "Meal type",
        key: OrderFilterID.mealTypeIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: true,
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

  return (
    <div className="container bg-white mt-6">
      <div className="flex justify-between items-center ">
        <TableTitle tableTitle={"Orders"} itemName={""} start={0} total={0} />
        <TableFilters<OrderFilterID>
          appliedFilters={appliedFilters}
          onFilterApply={applyFilters}
          filters={filters}
          onFilterReset={resetFilters}
          canResetFilters={canResetFilters}
          isLoading={false}
          className="px-5"
        />
      </div>
      <Table<Order>
        loading={false}
        columns={columns()}
        data={data}
        getRowCanExpand={() => true}
        emptyMessage="No orders found"
        parentClassName=""
        // pagination={{
        //   pageCount: 1,
        //   pageData: {
        //     page: 1,
        //     pageSize: 1,
        //     total: 1,
        //     count: 1,
        //   },
        // }}
      />
    </div>
  );
};

export default AdminTable;
