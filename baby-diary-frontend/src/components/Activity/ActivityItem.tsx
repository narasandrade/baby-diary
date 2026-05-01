import { Card, CardContent, Typography } from "@mui/material";
import type { Activity } from "../../../../shared/types/activity";
import { DeleteActivityDialogButton } from "./DeleteActivityDialogButton";

export function ActivityItem(activity: Activity) {
  const { type, createdAt } = activity;
  const activityTime = new Date(createdAt);

  const displayDate =
    activityTime.getDate() +
    "/" +
    (activityTime.getMonth() < 10
      ? "0" + (activityTime.getMonth() + 1)
      : activityTime.getMonth() + 1) +
    "/" +
    activityTime.getFullYear();
  const displayTime = activityTime.getHours() + ":" + activityTime.getMinutes();

  return (
    <Card
      sx={{
        border: 1,
        borderColor: "primary.light",
        maxHeight: 100,
        maxWidth: 150,
        marginBottom: 2,
      }}
    >
      <CardContent
        sx={{ padding: 1, display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Typography gutterBottom sx={{ color: "text.primary", fontSize: 16 }}>
            {type}
          </Typography>

          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {displayDate}
          </Typography>

          <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
            {displayTime}
          </Typography>
        </div>
        <div>
          <DeleteActivityButton id={activity._id} />
        </div>
      </CardContent>
    </Card>
  );
}
