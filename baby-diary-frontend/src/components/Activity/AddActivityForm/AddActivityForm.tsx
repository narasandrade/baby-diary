import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  ACTIVITY_OPTIONS,
  type ActivityType,
} from "../../../../../shared/types/activity";
import { isValidActivityType } from "../../../../../shared/utils/utils";
import { usePostActivity } from "../../../hooks/usePostActivity";

export function AddActivityForm() {
  const [selected, setSelected] = useState<ActivityType>("Meal");
  const { isAuthenticated } = useAuth0();
  const { mutate, isPending } = usePostActivity();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    if (isValidActivityType(value)) {
      setSelected(value);
    }
  };

  const handleAddActivity = async () => {
    const newActivity = {
      type: selected,
    };

    mutate(newActivity);
  };

  return (
    <FormControl>
      <Typography gutterBottom variant="h4" sx={{ fontFamily: "Bad Script" }}>
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
            slotProps={{
              typography: {
                sx: { fontFamily: "Bad Script" },
              },
            }}
          />
        ))}
      </RadioGroup>

      <div>
        <Button
          variant="contained"
          onClick={handleAddActivity}
          disabled={isPending}
        >
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
            If you wish to save your activities linked to an email account,
            please make sure to log in first.
          </Typography>
        </Box>
      )}
    </FormControl>
  );
}
