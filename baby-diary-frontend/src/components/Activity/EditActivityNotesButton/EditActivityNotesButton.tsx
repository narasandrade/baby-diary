import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  SvgIcon,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { useEditActivity } from "../../../hooks/useEditActivity";
import type { Activity } from "../../../../../shared/types/activity";
import { formatDate, formatTime } from "../../../utils/date/dateUtils";

export function EditActivityNotesButton({ activity }: { activity: Activity }) {
  const [notes, setNotes] = useState(activity.notes || "");
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate, isPending } = useEditActivity();

  const handleEditActivity = async () => {
    const newActivity = {
      ...activity,
      notes: notes.trim() === "" ? undefined : notes.trim(),
    };

    mutate(newActivity);
    setOpenDialog(false);
  };

  const hasNotes = activity.notes && activity.notes.length > 0;

  const handleFocus = (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const length = event.target.value.length;

    event.target.setSelectionRange(length, length);
  };

  return (
    <>
      <IconButton
        aria-label={!hasNotes ? "Add activity notes" : "Edit activity notes"}
        onClick={() => setOpenDialog(true)}
        disabled={isPending}
        title={!hasNotes ? "Add activity notes" : "Edit activity notes"}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-describedby="dialog-description"
        role="alertdialog"
        disableRestoreFocus
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <DialogTitle>Edit Activity Notes</DialogTitle>
          <SvgIcon
            aria-label="Only activity notes can be edited."
            titleAccess="Only activity notes can be edited."
            sx={{ cursor: "pointer", color: "gray" }}
          >
            <InfoIcon />
          </SvgIcon>
        </div>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: 2,
            }}
          >
            <FormControl variant="standard">
              <TextField
                label="Activity Type"
                value={activity.type}
                slotProps={{ input: { readOnly: true } }}
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                label="Created at"
                value={
                  formatDate(activity.createdAt) +
                  " " +
                  formatTime(activity.createdAt)
                }
                slotProps={{ input: { readOnly: true } }}
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                label="Last Updated at"
                value={
                  formatDate(activity.updatedAt) +
                  " " +
                  formatTime(activity.updatedAt)
                }
                slotProps={{ input: { readOnly: true } }}
              />
            </FormControl>
          </Box>

          <FormControl variant="standard">
            <TextField
              label="Activity Notes"
              placeholder="Enter activity notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              maxRows={5}
              onFocus={handleFocus}
              autoFocus
              sx={{
                background: "aliceblue",
                color: "text.secondary",
                borderRadius: 1,
              }}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button onClick={handleEditActivity} disabled={isPending}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
