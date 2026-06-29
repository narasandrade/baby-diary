import { createTheme } from "@mui/material/styles";
import type { ActivityType } from "../../../shared/types/activity";
import styles from "@/styles/_colors.module.scss";

type ActivityColor = { main: string; contrastText: string };

declare module "@mui/material/styles" {
  interface Palette {
    activity: Record<ActivityType, ActivityColor>;
  }
  interface PaletteOptions {
    activity?: Record<ActivityType, ActivityColor>;
  }
}

export const ACTIVITY_PALETTE: Record<ActivityType, ActivityColor> = {
  Meal: { main: styles.meal, contrastText: styles.lightText },
  Bath: { main: styles.bath, contrastText: styles.lightText },
  "Fell asleep": { main: styles.fellAsleep, contrastText: styles.lightText },
  "Woke up": { main: styles.wokeUp, contrastText: styles.darkText },
  "Wet diaper": { main: styles.wetDiaper, contrastText: styles.darkText },
  "Dirty diaper": { main: styles.dirtyDiaper, contrastText: styles.darkText },
};

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: { palette: { activity: ACTIVITY_PALETTE } },
    dark: { palette: { activity: ACTIVITY_PALETTE } },
  },
});
