import React from "react";
import { BiCircle } from "react-icons/bi";

import { classNames } from "utils/className";

import PopOver from "../popOver";

interface InputWrapperProps {
  label?: string;
  name?: string;
  children: React.ReactNode;
  error?: string;
  isRequired?: boolean;
  className?: string;
  labelInfoPrefix?: string;
}

function InputWrapper(props: InputWrapperProps) {
  const {
    label,
    name,
    error,
    isRequired = false,
    children,
    className,
    labelInfoPrefix,
  } = props;

  return (
    <div className={classNames("flex flex-col", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-xs text-gray-60 mb-1 flex items-center"
        >
          {label}

          {isRequired && <span className="ml-2px text-error-base">*</span>}

          {labelInfoPrefix && (
            <PopOver
              trigger="click"
              html={
                <div className="w-60 p-3 text-start bg-white text-xs">
                  {labelInfoPrefix}
                </div>
              }
              theme="light"
            >
              <BiCircle
                className="cursor-pointer text-tertiary-primary-60 ml-1"
                size={12}
              />
            </PopOver>
          )}
        </label>
      )}

      {children}

      {error && <p className="text-xs text-error-base mt-1">{error}.</p>}
    </div>
  );
}

export default InputWrapper;
