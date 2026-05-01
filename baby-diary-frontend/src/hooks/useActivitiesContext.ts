// src/context/activities/useActivitiesContext.js
import { useContext } from "react";
import { ActivitiesContext } from "../context/activities/ActivitiesContext";

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);

  if (!context) {
    throw new Error(
      "useActivitiesContext must be called inside an ActivitiesProvider.",
    );
  }

  return context;
};
