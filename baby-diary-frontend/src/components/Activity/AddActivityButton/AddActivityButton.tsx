import { Button } from "@mui/material";
import type { ActivityType } from "../../../../../shared/types/activity";
import { usePostActivity } from "../../../hooks/usePostActivity";

export function AddActivityButton({ type }: { type: ActivityType }) {
  const { mutate, isPending } = usePostActivity();

  const handleAddActivity = async () => {
    const newActivity = {
      type,
    };

    mutate(newActivity);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleAddActivity}
        disabled={isPending}
      >
        Add Activity
      </Button>
    </div>
  );
}
