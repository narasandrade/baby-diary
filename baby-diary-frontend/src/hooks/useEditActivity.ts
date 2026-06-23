import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Activity } from "../../../shared/types/activity";
import { activitiesService } from "@/services/activity.service";
import { useNotification } from "./useNotification";

const editActivity = (newActivity: Activity) =>
  activitiesService.update(newActivity);

export function useEditActivity() {
  const { setNotify } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });

      setNotify({
        open: true,
        message: "Activity edited successfully.",
        severity: "success",
      });
    },
    onError: (error) => {
      setNotify({
        open: true,
        message: "Activity editing failed. Please try again.",
        severity: "error",
      });
      console.log("Error editing activity:", error);
    },
  });

  return mutation;
}
