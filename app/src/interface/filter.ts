import { FilterType } from "enums/filter";

export interface FilterState {
  [key: string]: string[] | number[] | string | number;
}

export interface FilterData {
  label: string;
  value: number | string;
}

export interface Filters<T> {
  debounceSearchText?: string;
  defaultValue?: FilterData;
  isFixed?: boolean;
  isHidden?: boolean;
  isMulti?: boolean;
  key: T;
  name: string;
  options?: FilterData[];
  type: FilterType;
}

// Define the DefaultFilter type with a constraint on T
export type DefaultFilter<T extends string | number | symbol> = Record<
  T,
  string | number | null
>;
