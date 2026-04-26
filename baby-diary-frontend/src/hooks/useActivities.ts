import { useContext, useEffect, useState } from "react";
import { activitiesService } from "../services/activity.service";
import { AppContext } from "../context/AppContext";

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activities, setActivities } = useContext(AppContext);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const data = await activitiesService.getAll();

        setActivities(data);
      } catch (err) {
        console.log("error", err);
        setError("Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [setActivities]);

  return {
    activities,
    loading,
    error,
  };
}
