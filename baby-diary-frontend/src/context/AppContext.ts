import { createContext, type Dispatch, type SetStateAction } from "react";
import type { Activity } from "../../../shared/types/activity";

export const AppContext = createContext<{
  activities: Activity[];
  setActivities: Dispatch<SetStateAction<Activity[]>>;
}>({
  activities: [],
  setActivities: () => undefined,
});
