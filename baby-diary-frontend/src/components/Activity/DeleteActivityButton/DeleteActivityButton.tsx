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
import { useDeleteActivity } from "../../../hooks/useDeleteActivity";

export function DeleteActivityButton({ id }: { id: string }) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const { mutate, isPending } = useDeleteActivity();

  const handleDeleteActivity = async () => {
    mutate(id);
    setOpenConfirmationDialog(false);
  };

  return (
    <>
      <IconButton
        aria-label="Delete Activity"
        onClick={() => setOpenConfirmationDialog(true)}
        disabled={isPending}
        title="Delete Activity"
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
