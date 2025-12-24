import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";
import type { SxProps, Theme } from "@mui/material/styles";

type UpdateButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
};

export function UpdateButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Update",
  sx,
}: UpdateButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        fontSize: "var(--standart-font-size)",
        padding: "0.9rem 1.2rem",
        boxShadow: 0,
        border: "var(--border-standart)",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-lemon-chiffon)",
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
