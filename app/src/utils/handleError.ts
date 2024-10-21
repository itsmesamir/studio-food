import { isArray } from "lodash";

import { error as errorToast } from "utils/toast";

import { Any } from "types/common";

import en, { ToastMessageType } from "constants/en";

export function handleError(error: Error | unknown | Any) {
  const errors = error?.response?.data?.errors || error?.response?.data?.error;

  const errorMessage = isArray(errors)
    ? errors[0]?.message || errors[0] || en.toast.SOMETHING_WENT_WRONG
    : errors?.message || errors || en.toast.SOMETHING_WENT_WRONG;

  errorToast({ title: ToastMessageType.ERROR, message: errorMessage });
}

export function parseError(error: Error | unknown | Any) {
  if (error?.response?.data?.errors) {
    return error.response.data.errors;
  }

  if (error?.response?.data) {
    return [error.response.data];
  }

  return [{ message: error.message || error || en.toast.SOMETHING_WENT_WRONG }];
}
