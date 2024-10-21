/* eslint-disable @typescript-eslint/no-explicit-any */
export type Any = any;

export interface Designation {
  id: number;
  name: string;
}

export interface Role {
  id?: number;
  name: string;
}

export interface UserRole {
  id: number;
  name: string;
  userId: number;
  userRoleId: number;
}
export interface DefaultObject {
  [key: string]: Any;
}

export enum Roles {
  ADMIN = 'admin',
  USER = 'user',
  MANAGER = 'manager',
  STAFF = 'staff',
}
