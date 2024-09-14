import React from "react";
import classname from "clsx";
import Select, {
  GroupBase,
  MenuPlacement,
  MultiValue,
  SingleValue,
  StylesConfig,
} from "react-select";

import { getClassName } from "utils/className";

import config from "config";

interface DropdownProps<OptionType> {
  defaultValue?: OptionType;
  error?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  label?: string;
  maxMenuHeight?: number;
  name?: string;
  onDropDownChange: (
    e: SingleValue<OptionType> | MultiValue<OptionType>
  ) => void;
  onInputChange?: (e: string) => void;
  options: OptionType[];
  placeholder?: string;
  value?: OptionType;
  noOptionsMessage?: () => string;
  isDisabled?: boolean;
  isClearable?: boolean;
  isMulti?: boolean;
  filterOption?: () => boolean;
  menuPlacement?: MenuPlacement;
  controlShouldRenderValue?: boolean;
  customStyles?: StylesConfig<OptionType, boolean, GroupBase<OptionType>>;
}

function Dropdown<OptionType>(props: DropdownProps<OptionType>) {
  const {
    name,
    error,
    label,
    value,
    isMulti,
    options,
    isLoading,
    isRequired,
    placeholder,
    isClearable,
    customStyles,
    defaultValue,
    filterOption,
    maxMenuHeight,
    onInputChange,
    noOptionsMessage,
    onDropDownChange,
    isDisabled = false,
    menuPlacement = "auto",
    controlShouldRenderValue,
  } = props;

  const handleDropDownChange = (
    e: SingleValue<OptionType> | MultiValue<OptionType>
  ) => {
    onDropDownChange(e);
  };

  return (
    <div
      className={classname("dropdown-container", { "dropdown-error": error })}
    >
      {label && (
        <label
          htmlFor={name}
          className={classname("dropdown-label", {
            "required-label": isRequired,
          })}
        >
          {label}
        </label>
      )}

      <Select
        classNamePrefix={getClassName("select")}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isLoading={isLoading}
        maxMenuHeight={maxMenuHeight || 250}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
        menuPortalTarget={document.body}
        menuPosition="absolute"
        onChange={handleDropDownChange}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        value={value}
        isMulti={isMulti}
        styles={customStyles}
        filterOption={filterOption}
        controlShouldRenderValue={controlShouldRenderValue}
      />
    </div>
  );
}

export default Dropdown;
