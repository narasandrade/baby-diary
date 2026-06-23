import { Typography } from "@mui/material";
import type { Activity } from "../../../../shared/types/activity";
import { ActivityItem, AddActivityForm } from "@/components";
import { useActivities } from "@/hooks";

export function Activities() {
  const { activities, isLoading, error } = useActivities();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 20rem",
          gap: "2rem",
          overflowY: "auto",
        }}
      >
        <main style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Typography
              gutterBottom
              variant="h4"
              sx={{ fontFamily: "Bad Script" }}
            >
              Activities
            </Typography>

            {activities?.length === 0 ? (
              <p>
                No activities recorded yet. Create a new activity to get
                started.
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
      </div>

      <aside
        style={{
          position: "fixed",
          width: "25rem",
          right: "2rem",
          top: "5rem",
        }}
      >
        <AddActivityForm />
      </aside>
    </>
  );
}
