import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";
import type { SxProps, Theme } from "@mui/material/styles";
import { BsStop } from "react-icons/bs";

type StopButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
};

export function StopButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Stop",
  sx,
}: StopButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      startIcon={<BsStop color="var(--color-white)" />}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        minWidth: "13.5rem",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-light-coral)",
        "&:hover": {
          bgcolor: "var(--color-indian-red)",
        },
        ...sx,
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
