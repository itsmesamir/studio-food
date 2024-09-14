import { Designation, Role } from './common';

export interface MinimalUser {
  id: number;
  name: string;
  email: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  countryId?: number;
  department: string;
  designationId?: number;
  designation?: Designation;
  managerId?: number;
  manager?: MinimalUser;
  phone: string;
  roleIds?: number[];
  roles: Role[];
}

export interface UserFilters {
  id?: number;
  email?: string;
  role?: string;
  excludeIds?: string;
}

export type UserBody = Omit<User, 'id'>;
