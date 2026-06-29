import { IconButton, Tooltip, useColorScheme } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export function ThemeModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  // `mode` is undefined until the color scheme has mounted; render a
  // same-sized placeholder to avoid a layout shift in the toolbar.
  if (!mode) {
    return (
      <IconButton color="inherit" disabled sx={{ width: 40, height: 40 }} />
    );
  }

  // When following the OS ("system"), the visible appearance comes from
  // `systemMode`, so resolve it to reflect what's actually on screen.
  const isDark = (mode === "system" ? systemMode : mode) === "dark";

  const toggleTitle = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={toggleTitle}>
      <IconButton
        color="inherit"
        aria-label={toggleTitle}
        onClick={() => setMode(isDark ? "light" : "dark")}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
