import { Box, useMediaQuery, useTheme } from "@mui/material";
import { AddActivityForm } from "@/components";

export function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return <AddActivityForm />;
  }

  return (
    <Box
      component="aside"
      sx={{
        backgroundColor: "background.paper",
        borderLeft: "2px solid",
        borderColor: "divider",
        padding: 2,
        overflowY: "auto",
        width: "fit-content",
      }}
    >
      <AddActivityForm />
    </Box>
  );
}
