// src/context/notification/useNotification.js
import { useContext } from "react";
import { NotificationContext } from "../context/notification/NotificationContext";

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be called inside a NotificationProvider.",
    );
  }

  return context;
};
