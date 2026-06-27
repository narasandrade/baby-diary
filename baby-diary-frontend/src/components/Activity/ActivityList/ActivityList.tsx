import { Typography, useMediaQuery, useTheme } from "@mui/material";
import type { Activity } from "../../../../../shared/types/activity";
import { ActivityItem } from "@/components";
import { useActivities } from "@/hooks";

export function ActivityList() {
  const { activities, isLoading, error } = useActivities();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        paddingBottom: isMobile ? "88px" : "1rem",
      }}
    >
      <div>
        <Typography gutterBottom variant="h4" sx={{ fontFamily: "Bad Script" }}>
          Activities
        </Typography>

        {activities?.length === 0 ? (
          <p>
            No activities recorded yet. Create a new activity to get started.
          </p>
        ) : (
          <section>
            {activities?.map((activity: Activity) => (
              <ActivityItem key={activity._id} {...activity} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
