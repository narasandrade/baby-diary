import type { ReactNode } from "react";
import { ActivitiesProvider } from "./activities/ActivitiesProvider";
import { NotificationProvider } from "./notification/NotificationProvider";
import { Auth0ProviderWithHistory } from "./auth/Auth0ProviderWithHistory";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <NotificationProvider>
      <Auth0ProviderWithHistory>
        <ActivitiesProvider>{children}</ActivitiesProvider>
      </Auth0ProviderWithHistory>
    </NotificationProvider>
  );
};

export default AppProviders;
