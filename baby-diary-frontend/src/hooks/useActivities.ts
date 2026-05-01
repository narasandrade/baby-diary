import { useEffect, useState } from "react";
import { activitiesService } from "../services/activity.service";
import { useActivitiesContext } from "./useActivitiesContext";

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activities, setActivities } = useActivitiesContext();

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
