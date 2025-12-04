import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { AppButton } from "../button/AppButton";

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title = "Are you sure",
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        sx={{
          fontFamily: "var(--secondary-font)",
          fontSize: "var(--medium-font-size)",
          alignSelf: "center",
        }}
      >
        {title}
      </DialogTitle>

      {description && (
        <DialogContent>
          <Typography
            sx={{
              fontFamily: "var(--secondary-font)",
              fontSize: "var(--small-font-size)",
              textAlign: "center",
            }}
          >
            {description}
          </Typography>
        </DialogContent>
      )}

      <DialogActions
        sx={{
          padding: "0 0 1.6rem",
          gap: "var(--gap-mini)",
          justifyContent: "center",
        }}
      >
        <AppButton
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{ minWidth: "auto" }}
        >
          {cancelLabel}
        </AppButton>

        <AppButton
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
          sx={{
            minWidth: "auto",
            bgcolor: "var(--color-indian-red)",
            color: "white",
            "&:hover": {
              bgcolor: "var(--color-indian-red-dark, var(--color-indian-red))",
            },
          }}
        >
          {loading ? "Deleting..." : confirmLabel}
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
