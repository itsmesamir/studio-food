import Table from "../table/Table";
import { columns } from "./column";

const AdminTable = () => {
  // const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get("/api/orders", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     });
  //     setData(res.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <Table<Order>
        loading={false}
        columns={columns()}
        data={[
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
          {
            name: "John Doe",
            mealType: "Breakfast",
            orderTime: "2021-09-01",
          },
        ]}
        getRowCanExpand={() => true}
        emptyMessage=""
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
    </div>
  );
};

export default AdminTable;
