import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "./notification/NotificationProvider";
import { Auth0ProviderWithConfig } from "./auth/Auth0ProviderWithConfig";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Auth0ProviderWithConfig>{children}</Auth0ProviderWithConfig>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
