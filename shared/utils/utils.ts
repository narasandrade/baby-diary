import { ACTIVITY_OPTIONS, ActivityType } from "../types/activity";

export const isValidActivity = (value: any): value is ActivityType => {
  return ACTIVITY_OPTIONS.includes(value as ActivityType);
};
