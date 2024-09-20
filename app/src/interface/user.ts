export interface User {
  id: number;
  name: string;
  designation: string;
  department: string;
}

export interface UserRowData {
  row: { original: User };
}
