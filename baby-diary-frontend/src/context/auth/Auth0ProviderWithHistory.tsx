import { type AppState, Auth0Provider } from "@auth0/auth0-react";
import { type ReactNode } from "react";

interface Auth0ProviderWithConfigProps {
  children: ReactNode;
}

export const Auth0ProviderWithHistory = ({
  children,
}: Auth0ProviderWithConfigProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

  const onRedirectCallback = (appState?: AppState) => {
    window.history.pushState(
      appState,
      appState?.returnTo || window.location.pathname,
    );
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
