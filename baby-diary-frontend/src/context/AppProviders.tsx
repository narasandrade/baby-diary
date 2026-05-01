import type { ReactNode } from "react";
import { ActivitiesProvider } from "./activities/ActivitiesProvider";
import { NotificationProvider } from "./notification/NotificationProvider";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <NotificationProvider>
      <ActivitiesProvider>{children}</ActivitiesProvider>
    </NotificationProvider>
  );
};

export default AppProviders;
