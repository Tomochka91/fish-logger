import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";
import type { SxProps, Theme } from "@mui/material/styles";
import { BsPlay } from "react-icons/bs";

type StartButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
  sx?: SxProps<Theme>;
};

export function StartButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Start",
  sx,
}: StartButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      startIcon={<BsPlay color="var(--color-white)" />}
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        minWidth: "13.5rem",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-tropical-mint)",
        "&:hover": {
          bgcolor: "var(--color-mint)",
        },
        ...sx,
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
