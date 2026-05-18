import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, SignUpButton } from "../Auth";

export function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Baby Diary
          </Typography>

          {!isAuthenticated && (
            <>
              <SignUpButton />
              <LoginButton />
            </>
          )}

          {isAuthenticated && <LogoutButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
