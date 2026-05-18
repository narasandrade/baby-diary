import Button from "@mui/material/Button";
import { useState } from "react";

import {
  ACTIVITY_OPTIONS,
  type ActivityType,
} from "../../../../../shared/types/activity";
import { isValidActivity } from "../../../../../shared/utils/utils";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { activitiesService } from "../../../services/activity.service";
import { useActivitiesContext } from "../../../hooks/useActivitiesContext";
import { useNotificationContext } from "../../../hooks/useNotificationContext";
import { useAuth0 } from "@auth0/auth0-react";

export function AddActivityForm() {
  const [selected, setSelected] = useState<ActivityType>("FEED");
  const { setActivities } = useActivitiesContext();
  const { setNotify } = useNotificationContext();
  const { isAuthenticated } = useAuth0();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    if (isValidActivity(value)) {
      setSelected(value);
    }
  };

  const handleAddActivity = async () => {
    try {
      const newActivity = await activitiesService.create({
        type: selected,
      });

      setActivities((prev) => [newActivity, ...prev]);
      setNotify({
        open: true,
        message: "Activity added successfully!",
        severity: "success",
      });
    } catch (error) {
      setNotify({
        open: true,
        message: "Failed to add activity. Please try again.",
        severity: "error",
      });
      console.log("Error adding activity:", error);
    }
  };

  return (
    <FormControl>
      <Typography gutterBottom variant="h4">
        Add New Activity
      </Typography>
      <FormLabel id="demo-controlled-radio-buttons-group">
        Select the type of activity:
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={selected}
        onChange={handleChange}
      >
        {ACTIVITY_OPTIONS.map((option) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>

      <div>
        <Button variant="contained" onClick={handleAddActivity}>
          Add Activity
        </Button>
      </div>

      {!isAuthenticated && (
        <Box
          sx={{
            padding: 2,
            marginTop: 2,
            borderRadius: 4,
            bgcolor: "info.light",
            color: "info.contrastText",
            display: "flex",
          }}
        >
          <InfoIcon sx={{ height: "1rem", width: "1rem", marginTop: 0.5 }} />

          <Typography component="span" sx={{ marginLeft: 1 }}>
            If you want to save your activities, please make sure to log in
            first. Otherwise, your activities will not be saved and will be lost
            when you refresh the page.
          </Typography>
        </Box>
      )}
    </FormControl>
  );
}
