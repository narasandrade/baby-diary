import { useState, type ReactNode } from "react";
import type { Activity } from "../../../../shared/types/activity";
import { ActivitiesContext } from "./ActivitiesContext";

interface ActivitiesProviderProps {
  children: ReactNode;
}

export const ActivitiesProvider = ({ children }: ActivitiesProviderProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  return (
    <ActivitiesContext.Provider value={{ activities, setActivities }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
