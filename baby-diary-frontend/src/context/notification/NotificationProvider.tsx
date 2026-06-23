import { useState, type ReactNode } from "react";
import { Alert, Snackbar } from "@mui/material";
import { NotificationContext, type Notification } from "./NotificationContext";

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notify, setNotify] = useState<Notification>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setNotify({ ...notify, open: false });
  };

  return (
    <NotificationContext.Provider value={{ notify, setNotify }}>
      {children}

      <Snackbar
        open={notify.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={notify.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
