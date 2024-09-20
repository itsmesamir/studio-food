import { useEffect, useState } from "react";

import { User } from "interface/user";
import { fetchUsers } from "services/users";
import Table from "../table/Table";
import { columns } from "./column";



const UsersTable = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers(); 
        setData(data); 
      } catch (error) {
        console.error("Error fetching users:", error); 
      }
    };

    fetchData();
  }, []);

 
 
  return (
    <div>
      <Table<User>
        loading={false}
        columns={columns()}
        data={data||[]}
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
