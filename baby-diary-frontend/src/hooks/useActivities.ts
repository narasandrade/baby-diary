import { useEffect, useState } from "react";
import { activitiesService } from "../services/activity.service";
import { useActivitiesContext } from "./useActivitiesContext";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../services/api";

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activities, setActivities } = useActivitiesContext();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    async function fetchActivities() {
      try {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently();

          api.interceptors.request.use((config) => {
            if (token) {
              config.headers["Authorization"] = `Bearer ${token}`;
            }

            return config;
          });
        }

        const data = await activitiesService.getAll();

        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError("Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [setActivities, isAuthenticated, getAccessTokenSilently]);

  return {
    activities,
    loading,
    error,
  };
}
