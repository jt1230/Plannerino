import { Alert, Snackbar } from "@mui/material";

export default function SnackBarAlert({ message, open, setOpen, severity }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1200}
      onClose={() => setOpen(false)}
      sx={{ height: "100%" }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
