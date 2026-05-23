import { Typography } from "@mui/material";
import type { Activity } from "../../../../shared/types/activity";
import { useHomeData } from "../../hooks/useHomeData";
import { ActivityItem, AddActivityForm } from "../../components/Activity";

export function Activities() {
  const { activities, loading, error } = useHomeData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 20rem",
        gap: "2rem",
      }}
    >
      <main style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Typography gutterBottom variant="h4">
            Activities
          </Typography>

          {activities.length === 0 ? (
            <p>
              No activities recorded yet. Create a new activity to get started.
            </p>
          ) : (
            <section>
              {activities.map((activity: Activity) => (
                <ActivityItem key={activity._id} {...activity} />
              ))}
            </section>
          )}
        </div>
      </main>

      <aside style={{ marginRight: "1rem" }}>
        <AddActivityForm />
      </aside>
    </div>
  );
}
