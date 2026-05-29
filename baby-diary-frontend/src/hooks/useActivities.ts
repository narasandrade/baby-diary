import { activitiesService } from "../services/activity.service";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

const fetchActivities = async (
  isAuthenticated: boolean,
  getAccessTokenSilently: () => Promise<string>,
) => {
  if (isAuthenticated) {
    const token = await getAccessTokenSilently();

    api.interceptors.request.use((config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    });
  }

  return await activitiesService.getAll();
};

export function useActivities() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const query = useQuery({
    queryFn: () => fetchActivities(isAuthenticated, getAccessTokenSilently),
    queryKey: ["activities"],
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    activities: query.data,
  };
}
