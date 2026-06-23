import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../../../shared/types/activity";
import { activitiesService } from "@/services/activity.service";
import { useNotification } from "./useNotification";

const postNewActivity = (
  activity: Omit<Activity, "_id" | "createdAt" | "updatedAt">,
) => activitiesService.create(activity);

export function usePostActivity() {
  const { setNotify } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postNewActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });

      setNotify({
        open: true,
        message: "Activity added successfully!",
        severity: "success",
      });
    },
    onError: (error) => {
      setNotify({
        open: true,
        message: "Failed to add activity. Please try again.",
        severity: "error",
      });
      console.log("Error adding activity:", error);
    },
  });

  return mutation;
}
