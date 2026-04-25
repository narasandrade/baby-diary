import { Schema, model } from "mongoose";
import { ActivityType } from "../../../shared/types/activity";

interface ActivityDocument {
  type: ActivityType;
  notes?: string;
}

const ActivitySchema = new Schema<ActivityDocument>(
  {
    type: {
      type: String,
      required: true,
    },
    notes: { type: String },
  },
  { timestamps: true },
);

export const ActivityModel = model<ActivityDocument>(
  "Activity",
  ActivitySchema,
);
