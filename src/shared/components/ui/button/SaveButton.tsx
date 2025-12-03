import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";

type SaveButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
};

const btnSx = {
  flex: 1,
  minWidth: "auto",
  color: "var(--color-gunmetal)",
  bgcolor: "var(--color-tropical-mint)",
  "&:hover": {
    bgcolor: "var(--color-mint)",
  },
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
        minWidth: "auto",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-tropical-mint)",
        "&:hover": {
          bgcolor: "var(--color-mint)",
        },
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
