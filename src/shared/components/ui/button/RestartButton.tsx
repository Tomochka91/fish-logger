import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";
import type { SxProps, Theme } from "@mui/material/styles";
import { BsArrowClockwise } from "react-icons/bs";

type RestartButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
};

export function RestartButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Restart",
  sx,
}: RestartButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      startIcon={<BsArrowClockwise />}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        minWidth: "13.5rem",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-vanilla)",
        "&:hover": {
          bgcolor: "var(--color-lemon-chiffon)",
        },
        ...sx,
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
