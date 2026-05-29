import { ACTIVITY_OPTIONS, type ActivityType } from "../types/activity";

export const isValidActivityType = (value: any): value is ActivityType => {
  return ACTIVITY_OPTIONS.includes(value as ActivityType);
};
