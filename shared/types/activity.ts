export const ACTIVITY_OPTIONS = ["FEED", "SLEEP", "DIAPER"] as const;

export type ActivityType = (typeof ACTIVITY_OPTIONS)[number];

export interface Activity {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: ActivityType;
  notes?: string;
  userId?: string;
}
