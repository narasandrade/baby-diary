import { useState, type ReactNode } from "react";
import type { Activity } from "../../../shared/types/activity";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <AppContext.Provider value={{ activities, setActivities }}>
      {children}
    </AppContext.Provider>
  );
};
