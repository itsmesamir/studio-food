import { SetStateAction } from "react";
import history from "./history";
import { unParseQuery } from "./queryParams";
import { URLSearchParamsInit } from "react-router-dom";

export const updateUrl = (value: object): void => {
  const queryParam = unParseQuery({ ...value });

  history.push({
    pathname: history.location.pathname,
    search: queryParam,
  });
};

/**
 * Sets the search parameters based on the provided object.
 *
 * @param searchParams - The current search parameters.
 * @param setSearchParams - The function to update search parameters.
 * @param paramsObject - The object containing the search parameters to set.
 */
export const setSearchParamsFromObject = (
  searchParams: URLSearchParams,
  setSearchParams: (value: SetStateAction<URLSearchParamsInit>) => void,
  paramsObject: Record<string, any>
) => {
  const newParams = new URLSearchParams(searchParams);

  // Iterate over the keys in the paramsObject and set each parameter
  Object.entries(paramsObject).forEach(([key, value]) => {
    if (value !== undefined) {
      newParams.set(key, value.toString());
    } else {
      newParams.delete(key); // Remove the parameter if the value is undefined
    }
  });

  // Update the search params in the URL
  setSearchParams(newParams);
};

// Function to get a search parameter by key
export const getSearchParam = (
  searchParams: URLSearchParams,
  key: string
): string | null => {
  return searchParams.get(key) || null;
};

// Function to set a search parameter
export const setSearchParam = (
  searchParams: URLSearchParams,
  setSearchParams: (value: SetStateAction<URLSearchParamsInit>) => void,
  key: string,
  value: string
) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(key, value);
  setSearchParams(newParams);
};

// Function to remove a search parameter
export const removeSearchParam = (
  searchParams: URLSearchParams,
  setSearchParams: (value: SetStateAction<URLSearchParamsInit>) => void,
  key: string
) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.delete(key);
  setSearchParams(newParams);
};

// Function to clear all search parameters
export const clearSearchParams = (
  setSearchParams: (value: SetStateAction<URLSearchParamsInit>) => void
) => {
  setSearchParams(new URLSearchParams());
};
