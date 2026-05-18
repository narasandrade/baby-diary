import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button
      sx={{ marginLeft: 1 }}
      variant="contained"
      color="secondary"
      onClick={handleLogin}
    >
      Login
    </Button>
  );
}
