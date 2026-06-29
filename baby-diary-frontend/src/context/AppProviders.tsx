import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NotificationProvider } from "./notification/NotificationProvider";
import { Auth0ProviderWithConfig } from "./auth/Auth0ProviderWithConfig";
import { theme } from "@/theme";

interface AppProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <Auth0ProviderWithConfig>{children}</Auth0ProviderWithConfig>
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
