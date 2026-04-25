import type { Activity } from "../../../../shared/types/activity";
import { useEffect, useState } from "react";
import { ActivityItem } from "../../components/Activity";
import { AddActivityForm } from "../../components/AddActivityForm";
import { getActivities } from "../../services/activityService";

export function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function loadActivities() {
      const data = await getActivities();
      setActivities(data);
    }

    loadActivities();
  }, []);

  return (
    <>
      <section>
        <h1>Activities</h1>

        {activities.length === 0 ? (
          <p>No activities recorded yet.</p>
        ) : (
          <section>
            {activities.map((activity: Activity) => (
              <ActivityItem key={activity.id} {...activity} />
            ))}
          </section>
        )}

        <h1>Add New Activity</h1>

        <AddActivityForm />
      </section>
    </>
  );
}
