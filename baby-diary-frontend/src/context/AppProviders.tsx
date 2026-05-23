import type { ReactNode } from "react";
import { ActivitiesProvider } from "./activities/ActivitiesProvider";
import { NotificationProvider } from "./notification/NotificationProvider";
import { Auth0ProviderWithConfig } from "./auth/Auth0ProviderWithConfig";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <NotificationProvider>
      <Auth0ProviderWithConfig>
        <ActivitiesProvider>{children}</ActivitiesProvider>
      </Auth0ProviderWithConfig>
    </NotificationProvider>
  );
};

export default AppProviders;
