import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { activitiesService } from "../../../services/activity.service";
import { useActivitiesContext } from "../../../hooks/useActivitiesContext";
import { useNotificationContext } from "../../../hooks/useNotificationContext";

export function DeleteActivityButton({ id }: { id: string }) {
  const { activities, setActivities } = useActivitiesContext();
  const { setNotify } = useNotificationContext();
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const handleDeleteActivity = async () => {
    try {
      const res = await activitiesService.delete(id);

      setActivities(activities.filter((activity) => activity._id !== id));

      setOpenConfirmationDialog(false);

      console.log("Activity deleted successfully:", res);

      setNotify({
        open: true,
        message: res.message,
        severity: "success",
      });
    } catch (error) {
      setNotify({
        open: true,
        message: "Activity deletion failed. Please try again.",
        severity: "error",
      });
      console.log("Error deleting activity:", error);
    }
  };

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={() => setOpenConfirmationDialog(true)}
      >
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={openConfirmationDialog}
        onClose={() => setOpenConfirmationDialog(false)}
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this activity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmationDialog(false)} autoFocus>
            No
          </Button>
          <Button onClick={handleDeleteActivity}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
