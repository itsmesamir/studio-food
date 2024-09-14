import _, { isEmpty, isEqual, isObject } from "lodash";
import React, { useEffect, useState } from "react";

import { removeFalseValue } from "utils/object";

import { Any, DefaultObject } from "types/common";

import { FilterType } from "enums/filter";
import { FilterData } from "interface/filter";

import useQuery from "./useQuery";

interface Filter {
  type: FilterType;
  options?: FilterData[];
  name: string;
  defaultValue?: DefaultObject | DefaultObject[] | string;
  isMulti?: boolean;
  isFixed?: boolean;
  key: string;
  isHidden?: boolean;
}

interface UseFiltersReturn {
  updateQueries: (q: Record<string, Any>) => void;
  updateDefaultFilters: (q: Record<string, Any>) => void;
  resetFilters: () => void;
  applyFilters: (filters: Record<string, Any>) => void;
  appliedFilters: Record<string, Any>;
  canResetFilters: boolean;
}

export default function useFilters<DefaultFilters, AppliedFilters>(
  defaultFilters: Record<string, Any>,
  saveOnURL = true
): UseFiltersReturn {
  const [appliedFilters, setAppliedFilters] = useState<Record<string, Any>>({});
  const [defaultFilterState, updateDefaultFilters] = useState(defaultFilters);
  const [canResetFilters, setCanResetFilters] = useState(false);

  useEffect(() => {
    const defaultFiltersWithValue = removeFalseValue(defaultFilters);
    const appliedFiltersWithValue = removeFalseValue(appliedFilters);

    const isFilterSameAsDefault = isEqual(
      appliedFiltersWithValue,
      defaultFiltersWithValue
    );

    setCanResetFilters(!isFilterSameAsDefault);
  }, [appliedFilters, defaultFilterState]);

  const [queries, updateQueries] = useQuery(
    defaultFilters,
    {
      convertToArray: true,
      typeConversion: true,
    },
    saveOnURL
  );

  const resetFilters = () => {
    const withoutFilters = _.omit(queries, Object.keys(defaultFilterState));

    updateQueries({ ...defaultFilterState, ...withoutFilters });
  };

  useEffect(() => {
    const validFilters = _.pick(queries, Object.keys(defaultFilterState));

    setAppliedFilters(validFilters);
  }, [queries]);

  const applyFilters = (filters: Record<string, Any>) => {
    const validFilters: Record<string, Any> = {};

    Object.keys(filters).forEach((key: string) => {
      if (isObject(filters[key]) && isEmpty(filters[key])) {
        return;
      }

      if (!filters[key]) {
        return;
      }

      validFilters[key] = filters[key];
    });

    updateQueries(validFilters);
  };

  return {
    appliedFilters,
    updateQueries,
    updateDefaultFilters,
    resetFilters,
    applyFilters,
    canResetFilters,
  };
}
