import React from "react";
import DatePickerPicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { DEFAULT_DATE_FORMAT } from "constants/date";

import InputWrapper from "../inputWrapper";

interface DatePickerProps {
  name?: string;
  label?: string;
  value?: Date;
  onChange?: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
  isClearable?: boolean;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

function DatePicker(props: DatePickerProps) {
  const {
    name,
    label,
    value,
    onChange,
    placeholderText,
    dateFormat = DEFAULT_DATE_FORMAT,
    isClearable = false,
    showYearDropdown = false,
    showMonthDropdown = false,
    minDate,
    maxDate,
    disabled = false,
    required = false,
    className,
  } = props;

  return (
    <InputWrapper label={label}>
      <DatePickerPicker
        name={name}
        selected={value}
        onChange={onChange}
        placeholderText={placeholderText}
        dateFormat={dateFormat}
        isClearable={isClearable}
        showYearDropdown={showYearDropdown}
        showMonthDropdown={showMonthDropdown}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        required={required}
        className={className}
      />
    </InputWrapper>
  );
}

export default DatePicker;
