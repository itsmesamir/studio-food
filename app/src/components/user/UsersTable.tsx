import { useEffect, useState } from "react";
import { User } from "interface/user";
import { fetchUsers, createUser } from "services/users";
import Table from "../table/Table";
import { columns } from "./column";
import TableTitle from "components/table/components/TableTitle";
import UserFormModal from "./UserFormModal";
import { handleError } from "utils/handleError";
import { success } from "utils/toast";

const UsersTable = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setData(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUserSubmit = async (formData: any) => {
    try {
      await createUser(formData);
      setShowModal(false);
      fetchData();

      success({
        title: "Success",
        message: "User has been created successfully",
      });

      alert("User created successfully");
    } catch (error) {
      alert("Error creating user");
      handleError(error);
    }
  };

  return (
    <div className="container bg-white mt-6">
      <div className="flex justify-between items-center">
        <TableTitle
          tableTitle="Users"
          itemName={""}
          start={data.length}
          total={data.length}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-8"
          onClick={() => setShowModal(true)}
        >
          Add User
        </button>
      </div>

      <Table<User>
        loading={loading}
        columns={columns()}
        data={data || []}
        getRowCanExpand={() => true}
        emptyMessage="No users found"
        parentClassName="px-4"
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

      <UserFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUserSubmit}
      />
    </div>
  );
};

export default UsersTable;
