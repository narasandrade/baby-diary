export const ACTIVITY_OPTIONS = [
  "Meal",
  "Bath",
  "Fell asleep",
  "Woke up",
  "Wet diaper",
  "Dirty diaper",
] as const;

export type ActivityType = (typeof ACTIVITY_OPTIONS)[number];

export interface Activity {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: ActivityType;
  notes?: string;
  userId?: string;
}
