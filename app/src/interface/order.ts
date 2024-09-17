interface Order {
  name: string;
  mealType: string;
  orderTime: string;
  user: {
    id: number;
    name: string;
    designation: string;
    department: string;
  };
}
