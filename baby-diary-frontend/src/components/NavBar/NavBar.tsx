import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import BabyIcon from "@/assets/baby-icon.svg";
import { LoginButton, LogoutButton, SignUpButton } from "@/components";

export function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            src={BabyIcon}
            alt="Baby icon"
            sx={{
              width: 32,
              height: 32,
              marginRight: 2,
            }}
          />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Bad Script" }}
          >
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
