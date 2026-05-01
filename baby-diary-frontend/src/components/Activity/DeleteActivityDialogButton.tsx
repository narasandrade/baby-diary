import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { activitiesService } from "../../services/activity.service";
import { AppContext } from "../../context/AppContext";

export function DeleteActivityDialogButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const { activities, setActivities } = useContext(AppContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this activity? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
          <Button
            onClick={async () => {
              await activitiesService.delete(id);

              setActivities(
                activities.filter((activity) => activity._id !== id),
              );

              handleClose();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
