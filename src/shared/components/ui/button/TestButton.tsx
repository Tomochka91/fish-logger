import { CircularProgress } from "@mui/material";
import { AppButton } from "./AppButton";

type TestButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
};

export function TestButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Test connection",
}: TestButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        flex: 1,
        padding: "var(--padding-special)", // пониже/поуже
        minWidth: "auto", // не раздуваем
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-lemon-chiffon)",
        borderColor: "var(--color-lemon-chiffon)",
        "&:hover": {
          bgcolor: "var(--color-vanilla)",
          borderColor: "var(--color-vanilla)",
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
