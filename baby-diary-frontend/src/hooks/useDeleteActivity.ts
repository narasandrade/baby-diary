import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activitiesService } from "@/services/activity.service";
import { useNotification } from "./useNotification";

const deleteActivity = (id: string) => activitiesService.delete(id);

export function useDeleteActivity() {
  const { setNotify } = useNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });

      setNotify({
        open: true,
        message: "Activity deleted successfully.",
        severity: "success",
      });
    },
    onError: (error) => {
      setNotify({
        open: true,
        message: "Activity deletion failed. Please try again.",
        severity: "error",
      });
      console.log("Error deleting activity:", error);
    },
  });

  return mutation;
}
