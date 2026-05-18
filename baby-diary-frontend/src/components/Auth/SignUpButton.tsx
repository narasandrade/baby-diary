import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export function SignUpButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button sx={{ color: "white" }} onClick={handleSignUp}>
      Sign Up
    </Button>
  );
}
