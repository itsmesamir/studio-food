import { notify } from "components/Toast";

interface ToastParams {
  className?: string;
  message: string;
  title: string;
}

export function success({ title, message, className }: ToastParams) {
  notify({ type: "success", data: { title, message }, className });
}

export function error({ title, message, className }: ToastParams) {
  notify({ type: "danger", data: { title, message }, className });
}

export function warning({ title, message, className }: ToastParams) {
  notify({ type: "warning", data: { title, message }, className });
}
