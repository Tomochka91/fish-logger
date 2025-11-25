import { CircularProgress } from "@mui/material";
import { AppButton } from "./AppButton";

type SaveButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
};

export function SaveButton({
  loading = false,
  disabled = false,
  label = "Save",
}: SaveButtonProps) {
  return (
    <AppButton
      type="submit"
      variant="contained"
      //   disableElevation
      disabled={disabled || loading}
      sx={{
        flex: 1,
        padding: "var(--padding-special)",
        minWidth: "auto",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-tropical-mint)",
        "&:hover": {
          bgcolor: "var(--color-mint)",
        },
      }}
    >
      {loading ? (
        <CircularProgress
          size={14}
          sx={{ display: "block", transformOrigin: "center" }}
        />
      ) : (
        label
      )}
    </AppButton>
  );
}
