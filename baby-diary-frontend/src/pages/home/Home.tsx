import { Typography } from "@mui/material";
import type { Activity } from "../../../../shared/types/activity";
import { ActivityItem } from "../../components/Activity";
import { AddActivityForm } from "../../components/AddActivityForm";
import { useHomeData } from "../../hooks/useHomeData";

export function Home() {
  const { activities, loading, error } = useHomeData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section>
        <Typography gutterBottom variant="h4">
          Activities
        </Typography>

        {activities.length === 0 ? (
          <p>No activities recorded yet.</p>
        ) : (
          <section>
            {activities.map((activity: Activity) => (
              <ActivityItem key={activity._id} {...activity} />
            ))}
          </section>
        )}

        <AddActivityForm />
      </section>
    </>
  );
}
