import { toast } from "sonner";

export function toastSuccess(
  message: string,
  options?: { description?: string; duration?: number },
) {
  toast.success(message, options);
}

export function toastError(
  message: string,
  options?: { description?: string; duration?: number },
) {
  toast.error(message, options);
}

export function toastWarning(
  message: string,
  options?: { description?: string; duration?: number },
) {
  toast.warning(message, options);
}

export function toastInfo(
  message: string,
  options?: { description?: string; duration?: number },
) {
  toast.info(message, options);
}
