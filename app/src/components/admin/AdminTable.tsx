import TableFilters from "components/table/components/TableFilter";
import Table from "../table/Table";
import { columns } from "./column";
import useFilters from "hooks/useFilter";
import { DefaultFilter, Filters } from "interface/filter";
import { useEffect, useMemo, useState } from "react";
import { FilterType } from "enums/filter";
import { MealType } from "enums/order";
import http from "services/http";

enum OrderFilterID {
  userIds = "userIds",
  mealTypeIds = "mealTypeIds",
  date = "date",
}

const DEFAULT_FILTERS: DefaultFilter<OrderFilterID> = {
  userIds: null,
  mealTypeIds: null,
  date: null,
};

const AdminTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await http.get("/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(res.data);
    };
    fetchData();
  }, []);

  const filters: Filters<OrderFilterID>[] = useMemo(
    () => [
      {
        name: "name",
        key: OrderFilterID.userIds,
        isFixed: true,
        type: FilterType.Dropdown,
        isMulti: true,
        options: [
          {
            label: "John Doe",
            value: 1,
          },
          {
            label: "John Doe",
            value: 1,
          },
        ],
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
    []
  );

  const { appliedFilters, applyFilters, resetFilters, canResetFilters } =
    useFilters(DEFAULT_FILTERS);

  return (
    <div>
      <TableFilters<OrderFilterID>
        appliedFilters={appliedFilters}
        onFilterApply={applyFilters}
        filters={filters}
        onFilterReset={resetFilters}
        canResetFilters={canResetFilters}
        isLoading={false}
      />
      <Table<Order>
        loading={false}
        columns={columns()}
        data={data}
        getRowCanExpand={() => true}
        emptyMessage=""
        parentClassName="px-4"
        pagination={{
          pageCount: 1,
          pageData: {
            page: 1,
            pageSize: 1,
            total: 1,
            count: 1,
          },
        }}
      />
    </div>
  );
};

export default AdminTable;
