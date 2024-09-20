import { useEffect, useState } from "react";

import { User } from "interface/user";
import { fetchUsers } from "services/users";
import Table from "../table/Table";
import { columns } from "./column";
import TableTitle from "components/table/components/TableTitle";

const UsersTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <TableTitle
          tableTitle="Users"
          itemName={""}
          start={data.length}
          total={data.length}
        />
      </div>
      <Table<User>
        loading={loading}
        columns={columns()}
        data={data || []}
        getRowCanExpand={() => true}
        emptyMessage="No users found"
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

export default UsersTable;
