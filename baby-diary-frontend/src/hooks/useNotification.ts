import { useContext } from "react";
import { NotificationContext } from "../context/notification/NotificationContext";

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be called inside a NotificationProvider.",
    );
  }

  return context;
};
