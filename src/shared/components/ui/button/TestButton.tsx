import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";
import type { SxProps, Theme } from "@mui/material/styles";

type TestButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
};

export function TestButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Test connection",
  sx,
}: TestButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        flex: 1,
        minWidth: "auto",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-lemon-chiffon)",
        borderColor: "var(--color-lemon-chiffon)",
        "&:hover": {
          bgcolor: "var(--color-vanilla)",
          borderColor: "var(--color-vanilla)",
        },
        ...sx,
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
