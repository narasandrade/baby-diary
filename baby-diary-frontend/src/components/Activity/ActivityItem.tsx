import type { Activity } from "../../../../shared/types/activity";

export function ActivityItem(activity: Activity) {
  const { type, createdAt } = activity;
  const activityTime = new Date(createdAt);

  const displayTime = activityTime.getHours() + ":" + activityTime.getMinutes();

  return (
    <div>
      <span>{type}</span>
      <span>{displayTime}</span>
    </div>
  );
}
