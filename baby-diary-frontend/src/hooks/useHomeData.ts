import { useActivities } from "./useActivities";

export function useHomeData() {
  const activitiesQuery = useActivities();

  const loading = activitiesQuery.loading;
  const error = activitiesQuery.error;

  return {
    activities: activitiesQuery.activities,
    loading,
    error,
  };
}
