import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Backdrop,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import BathtubIcon from "@mui/icons-material/Bathtub";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import FlatwareIcon from "@mui/icons-material/Flatware";
import InfoIcon from "@mui/icons-material/Info";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  ACTIVITY_OPTIONS,
  type ActivityType,
} from "../../../../../shared/types/activity";
import { isValidActivityType } from "../../../../../shared/utils/utils";
import { AddActivityButton } from "../AddActivityButton";
import { ACTIVITY_PALETTE } from "@/theme";
import { usePostActivity } from "@/hooks";

const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  Meal: <FlatwareIcon />,
  Bath: <BathtubIcon />,
  "Fell asleep": <BedtimeIcon />,
  "Woke up": <WbSunnyIcon />,
  "Wet diaper": <WaterDropIcon />,
  "Dirty diaper": <BabyChangingStationIcon />,
};

export function AddActivityForm() {
  const [selected, setSelected] = useState<ActivityType>("Meal");
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mutate, isPending } = usePostActivity();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;

    if (isValidActivityType(value)) {
      setSelected(value);
    }
  };

  const authInfoText =
    "If you wish to save your activities linked to an email account, please make sure to log in first.";

  if (isMobile) {
    return (
      <>
        <Backdrop
          open={open}
          sx={{ zIndex: (theme) => theme.zIndex.speedDial - 1 }}
        />

        <SpeedDial
          ariaLabel="Add new activity"
          icon={<SpeedDialIcon />}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          {ACTIVITY_OPTIONS.map((option) => (
            <SpeedDialAction
              key={option}
              icon={ACTIVITY_ICONS[option]}
              onClick={() => {
                mutate({ type: option });
                setOpen(false);
              }}
              slotProps={{
                staticTooltipLabel: {
                  sx: {
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    // Solid paper base keeps the label readable over the
                    // dimmed backdrop; the tint is layered on top of it.
                    bgcolor: "background.paper",
                    backgroundImage: `linear-gradient(${alpha(
                      ACTIVITY_PALETTE[option].main,
                      0.18,
                    )}, ${alpha(ACTIVITY_PALETTE[option].main, 0.18)})`,
                    border: "1px solid",
                    borderColor: alpha(ACTIVITY_PALETTE[option].main, 0.5),
                  },
                },
                tooltip: { title: option, open: true },
                fab: {
                  disabled: isPending,
                  sx: {
                    bgcolor: theme.palette.activity[option].main,
                    color: theme.palette.activity[option].contrastText,
                    "&:hover": {
                      bgcolor: theme.palette.activity[option].main,
                      filter: "brightness(0.92)",
                    },
                  },
                },
              }}
            />
          ))}
        </SpeedDial>

        {!isAuthenticated && (
          <Tooltip title={authInfoText} placement="right">
            <InfoIcon
              sx={{
                position: "fixed",
                bottom: 24,
                left: 16,
                color: "info.main",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        )}
      </>
    );
  }

  return (
    <FormControl>
      <Typography gutterBottom variant="h4" sx={{ fontFamily: "Bad Script" }}>
        Add New Activity
      </Typography>

      <FormLabel>Select the type of activity:</FormLabel>

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

      <AddActivityButton type={selected} />

      {!isAuthenticated && (
        <Box
          sx={{
            padding: 2,
            marginTop: 2,
            borderRadius: 4,
            bgcolor: "info.light",
            color: "info.contrastText",
            display: "flex",
            width: "25rem",
          }}
        >
          <InfoIcon sx={{ height: "1rem", width: "1rem", marginTop: 0.5 }} />

          <Typography component="span" sx={{ marginLeft: 1 }}>
            {authInfoText}
          </Typography>
        </Box>
      )}
    </FormControl>
  );
}
