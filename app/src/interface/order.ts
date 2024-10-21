interface Order {
  id?: number;
  name: string;
  department?: string;
  designation?: string;

  mealType: string;
  orderTime: string;
  user: {
    id: number;
    name: string;
    designation: string;
    department: string;
  };
}
