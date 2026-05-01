import { createContext, type Dispatch, type SetStateAction } from "react";

export type NotificationSeverity = "success" | "error" | "warning" | "info";

export interface Notification {
  open: boolean;
  message: string;
  severity: NotificationSeverity;
}

export const NotificationContext = createContext<{
  notify: Notification;
  setNotify: Dispatch<SetStateAction<Notification>>;
}>({
  notify: {
    open: false,
    message: "",
    severity: "success",
  },
  setNotify: () => undefined,
});
