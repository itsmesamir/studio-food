import _ from "lodash";
import classNames from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import {
  components,
  GroupBase,
  MenuListProps,
  StylesConfig,
} from "react-select";

import { FiSliders } from "react-icons/fi";

import Dropdown from "components/dropdown";
import DatePicker from "components/datePicker";

import { getDate, getFormattedDate } from "utils/date";

import { Any, DefaultObject } from "types/common";

import { FilterType } from "enums/filter";
import { FilterData, Filters } from "interface/filter";
import en from "constants/en";
import { black, neutrals900 } from "constants/color";
import { YYYY_MM_DD } from "constants/date";
import Modal from "components/modal/Modal";
import { BiFilter } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";

export interface BaseTableFilterProps<T> {
  isFilterModalOpen?: boolean;
  actionButton?: JSX.Element;
  appliedFilters: Any;

  canResetFilters?: boolean;
  className?: string;
  classes?: {
    header?: string;
    content?: string;
    filterList?: string;
    filterItem?: string;
    actionContainer?: string;
    actionPrimary?: string;
    actionSecondary?: string;
  };
  filters: Filters<T>[];
  isLoading?: boolean;
  onFilterApply: (filters: FilterData) => void;
  onFilterReset?: () => void;
  onMenuClose?: () => void;
  subTitle?: string;
  title?: string;
  trailing?: JSX.Element | null;
  styles?: {
    dropdownCustomStyles: StylesConfig<
      FilterData,
      boolean,
      GroupBase<FilterData>
    >;
  };
  singleFilter?: {
    dropdown?: boolean;
    debounceDropdown?: boolean;
    date?: boolean;
    dateRangePicker?: boolean;
    text?: boolean;
    toggleSwitch?: boolean;
  };

  action?: {
    primaryTitle?: string;
    secondaryTitle?: string;
  };
}

type TableFilterProps<T> = BaseTableFilterProps<T>;

interface ActionContentProps {
  isFilterChanged: boolean;
  onFilterApply: (filters: FilterData) => void;
  onFilterReset?: () => void;
  selectedFilters: FilterData;
  setAddedFilters: React.Dispatch<React.SetStateAction<FilterData[]>>;
  canResetFilters: boolean;
  trailing?: JSX.Element | null;
  classes?: {
    container?: string;
    primary?: string;
    secondary?: string;
  };
  action?: {
    primaryTitle?: string;
    secondaryTitle?: string;
  };
}

function ActionContent(props: ActionContentProps) {
  const {
    isFilterChanged,
    onFilterApply,
    selectedFilters,
    setAddedFilters,
    onFilterReset,
    canResetFilters,
    trailing,
    classes,
    action,
  } = props;

  function handleResetFilter() {
    setAddedFilters([]);

    if (onFilterReset) {
      onFilterReset();
    }
  }

  return (
    <>
      <div className={classNames("flex gap-x-4", classes?.container)}>
        <button
          type="button"
          className={classNames(
            "btn-primary",
            {
              "border-gray-300": !isFilterChanged,
              "": isFilterChanged,
            },
            classes?.primary
          )}
          disabled={!isFilterChanged}
          onClick={() => onFilterApply(selectedFilters)}
        >
          {action?.primaryTitle || en.BUTTON.APPLY}
        </button>
        <button
          type="button"
          className={classNames(classes?.secondary, "btn-secondary")}
          onClick={() => handleResetFilter()}
          disabled={!canResetFilters}
        >
          {action?.secondaryTitle || en.BUTTON.RESET}
        </button>
      </div>
      {trailing && (
        <div className="d-flex items-center ml-auto">{trailing}</div>
      )}
    </>
  );
}

function CustomMenulist(
  props: MenuListProps,
  additionalProp: ActionContentProps
) {
  const {
    isFilterChanged,
    onFilterApply,
    selectedFilters,
    setAddedFilters,
    onFilterReset,
    canResetFilters,
    trailing,
    classes,
    action,
  } = additionalProp;

  return (
    <div>
      <components.MenuList {...props} />

      <ActionContent
        isFilterChanged={isFilterChanged}
        onFilterApply={onFilterApply}
        selectedFilters={selectedFilters}
        setAddedFilters={setAddedFilters}
        onFilterReset={onFilterReset}
        canResetFilters={canResetFilters}
        trailing={trailing}
        classes={{
          container: classes?.container,
          primary: classes?.primary,
          secondary: classes?.secondary,
        }}
        action={{
          primaryTitle: action?.primaryTitle,
          secondaryTitle: action?.secondaryTitle,
        }}
      />
    </div>
  );
}

export default function TableFilters<T>(props: TableFilterProps<T>) {
  const {
    isFilterModalOpen,
    actionButton,
    appliedFilters,
    canResetFilters = false,
    className,
    classes,
    filters,
    isLoading = false,
    onFilterApply,
    onFilterReset,
    onMenuClose = () => {},
    subTitle,
    title,
    trailing,
    styles,
    singleFilter,
    action,
  } = props;

  const findDefaultFilters = (options: FilterData[], value: FilterData) => {
    const optionsArray = Array.isArray(options) ? options : [options];

    if (!value || !optionsArray.length) {
      return null;
    }

    if (!Array.isArray(value)) {
      return optionsArray.find((option) => {
        if (_.isObject(value)) {
          return _.isEqual(option.value, value);
        }

        return option.value === value;
      });
    }

    const filterValueMap = new Map();

    value.forEach((val) => {
      filterValueMap.set(val, val);
    });

    return optionsArray.filter((option) => filterValueMap.get(option.value));
  };

  const [selectedFilters, setSelectedFilters] = useState<DefaultObject>({});
  const [addedFilters, setAddedFilters] = useState<FilterData[]>([]);
  const [fixedFilters, setFixedFilters] = useState<Filters<T>[]>([]);
  const [moreFilters, setMoreFilters] = useState<FilterData[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(false);
  }, [isFilterModalOpen]);

  const onOpenModal = () => {
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    const tempFixedFilters: Filters<T>[] = [];
    const tempMoreFilters: DefaultObject[] = [];
    const tempAppliedMoreFilters: DefaultObject[] = [];

    filters?.forEach((filter) => {
      if (!filter.isHidden) {
        if (filter.isFixed) {
          tempFixedFilters.push(filter);
        } else {
          tempMoreFilters.push(filter);

          if (appliedFilters[filter.key]) {
            tempAppliedMoreFilters.push({
              filter,
              label: filter.name,
              value: filter.key,
            });
          }
        }
      }
    });

    setFixedFilters(tempFixedFilters);
  }, [filters]);

  const handleDropdownChange = (selectedValue: FilterData, key: string) => {
    let newValue: unknown = null;

    if (_.isArray(selectedValue)) {
      newValue = selectedValue.map(({ value }) => value);
    } else if (selectedValue) {
      newValue = selectedValue.value;
    }

    setSelectedFilters((prevState) => {
      return { ...prevState, [key]: newValue };
    });
  };

  useEffect(() => {
    setSelectedFilters(appliedFilters);
  }, [appliedFilters]);

  const [isFilterChanged, setIsFilterChanged] = useState<boolean>(false);

  useEffect(() => {
    const isFilterValueSame = _.isEqual(appliedFilters, selectedFilters);

    setIsFilterChanged(!isFilterValueSame);
  }, [selectedFilters, appliedFilters]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (!e || !e.target) {
      return;
    }

    const inputValue = e.target.value;

    setSelectedFilters((previousFilters) => ({
      ...previousFilters,
      [key]: inputValue,
    }));
  };

  const handleToggleSwitchFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (!e || !e.target) {
      return;
    }

    const value = e.target.checked;

    setSelectedFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  };

  const removeFilterState = (key: string) => {
    setSelectedFilters((prevFilters) => {
      if (!prevFilters) {
        return prevFilters;
      }

      const newSelectedFilters = { ...prevFilters };
      if (newSelectedFilters && newSelectedFilters[key]) {
        newSelectedFilters[key] = null;
      }

      return newSelectedFilters;
    });
  };

  const FilterElement = useCallback(
    ({
      filter,
      activeFilters,
      isAdditionalFilter = false,
      isFiltersLoading = false,
    }: Any) => {
      if (filter.isHidden) {
        return null;
      }

      const applyFilters = () => {
        if (activeFilters) {
          onFilterApply(activeFilters);
        }
      };

      if (filter.type === FilterType.Date) {
        return (
          <div className="filter__item cursor-pointer dropdown-button ">
            <DatePicker
              key={filter.key}
              name={filter.key}
              label={filter.name}
              value={(activeFilters && activeFilters[filter.key]) || getDate()}
              onChange={(e) =>
                setSelectedFilters((previousFilters) => ({
                  ...previousFilters,
                  [filter.key]: getFormattedDate(e, YYYY_MM_DD),
                }))
              }
            />
          </div>
        );
      }

      return (
        <div
          className={classNames({
            "filter__item--additional": isAdditionalFilter,
            filter__item: !isAdditionalFilter,
          })}
        >
          <Dropdown
            key={filter.key}
            value={
              activeFilters &&
              findDefaultFilters(
                filter.options as FilterData[],
                activeFilters[filter.key]
              )
            }
            onDropDownChange={(selectedValue) =>
              handleDropdownChange(selectedValue, filter.key)
            }
            placeholder={`Choose ${filter.name}`}
            options={filter.options}
            isMulti={filter.isMulti}
            menuPlacement={filter.menuPlacement}
            isLoading={isFiltersLoading}
            name={filter.name}
            customStyles={{
              menuList: (base) => ({
                ...base,
                width: "204px",
                flex: 1,
              }),
              control: (base, { isFocused }) => ({
                ...base,
                width: "204px",
                flex: 1,
                height: "40px",
                border: isFocused ? "none" : "none",
                outline: isFocused ? "none" : "none",
                boxShadow: isFocused ? "none" : "none",
                position: "relative",
              }),
              multiValue: (base) => ({
                ...base,
                borderRadius: "4px",
              }),
              menu: (base) => ({
                ...base,
                marginTop: "0px",
                display: "flex",
                border: "none",
                // boxShadow: "0px 22px 33px 4px #00000010",
                borderTop: "1px solid #e6e6e6",
              }),
              indicatorSeparator: (provided) => ({
                ...provided,
                display: "none",
                // Adjust indicator separator height
              }),

              singleValue: (provided) => ({
                ...provided,
                lineHeight: "40px", // Align single value vertically
              }),
              valueContainer: (base) => ({
                ...base,
                padding: "4px 28px 4px 8px",
                position: "static",
                fontSize: "16px",
                fontWeight: "normal",
                borderRadius: "4px",
                color: black,
                maxHeight: "90px",
                overflowY: "auto",

                height: "40px", // Adjust value container height
              }),
              indicatorsContainer(base) {
                return {
                  ...base,
                  position: "absolute",
                  right: "0px",
                };
              },
              container(base) {
                return {
                  ...base,
                  display: "flex",
                  border: "1px solid #e6e6e6",
                  borderRadius: "4px",
                  minHeight: "40px",
                  // boxShadow: "0px 3px 33px 0px #00000024;",
                };
              },
              multiValueRemove(base, state) {
                return {
                  ...base,
                  color: neutrals900,
                  cursor: state.isFocused ? "pointer" : "default",
                };
              },
              clearIndicator(base, state) {
                return {
                  ...base,
                  color: neutrals900,
                  cursor: state.isFocused ? "pointer" : "default",
                };
              },
              option(base) {
                return {
                  ...base,
                  height: "40px",
                  color: neutrals900,
                  fontSize: "16px",
                };
              },
              dropdownIndicator(base) {
                return {
                  ...base,
                  display: "none",
                };
              },
            }}
          />
        </div>
      );
    },
    []
  );

  return (
    <>
      <Modal
        // headerIcon={<UiSlidersVAlt size={20} className="color-gray-50" />}
        title="Filters"
        isOpen={openModal}
        className="table-filters__modal"
        onRequestClose={() => setOpenModal(false)}
      >
        <div className="flex flex-col gap-y-4">
          {fixedFilters.map((filter, idx) => (
            <FilterElement
              filter={filter}
              activeFilters={selectedFilters}
              key={idx}
              isFiltersLoading={isLoading}
            />
          ))}

          {/* <ActionContent
            isFilterChanged={isFilterChanged}
            onFilterApply={onFilterApply}
            selectedFilters={selectedFilters}
            setAddedFilters={setAddedFilters}
            onFilterReset={onFilterReset}
            canResetFilters={canResetFilters}
            trailing={trailing}
            action={{
              primaryTitle: action?.primaryTitle,
              secondaryTitle: action?.secondaryTitle,
            }}
          /> */}

          <ActionContent
            isFilterChanged={isFilterChanged}
            onFilterApply={onFilterApply}
            selectedFilters={selectedFilters as FilterData}
            setAddedFilters={setAddedFilters}
            onFilterReset={onFilterReset}
            canResetFilters={canResetFilters}
            trailing={trailing}
            classes={{
              container: classes?.actionContainer,
              primary: classes?.actionPrimary,
              secondary: classes?.actionSecondary,
            }}
            action={{
              primaryTitle: action?.primaryTitle,
              secondaryTitle: action?.secondaryTitle,
            }}
          />
        </div>
      </Modal>

      <div className={classNames("table-filters", className)}>
        <div className="lg:hidden">
          <FiSliders size={24} onClick={onOpenModal} />
        </div>

        <div
          className={classNames(
            "max-lg:hidden table__header d-flex",
            classes?.header
          )}
        >
          <div className={classNames("flex flex-wrap gap-4", classes?.content)}>
            <div
              className={classNames(
                "flex items-center flex-wrap gap-4",
                classes?.filterList
              )}
            >
              {fixedFilters.map((filter, idx) => (
                <div className={classNames(classes?.filterItem)}>
                  <FilterElement
                    filter={filter}
                    activeFilters={selectedFilters}
                    key={idx}
                    isFiltersLoading={isLoading}
                  />
                </div>
              ))}
            </div>

            <ActionContent
              isFilterChanged={isFilterChanged}
              onFilterApply={onFilterApply}
              selectedFilters={selectedFilters as FilterData}
              setAddedFilters={setAddedFilters}
              onFilterReset={onFilterReset}
              canResetFilters={canResetFilters}
              trailing={trailing}
              classes={{
                container: classes?.actionContainer,
                primary: classes?.actionPrimary,
                secondary: classes?.actionSecondary,
              }}
              action={{
                primaryTitle: action?.primaryTitle,
                secondaryTitle: action?.secondaryTitle,
              }}
            />
          </div>
          {actionButton}
        </div>
      </div>
    </>
  );
}
