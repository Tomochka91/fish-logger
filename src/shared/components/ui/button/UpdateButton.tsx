import { AppButton } from "./AppButton";
import { LoaderMini } from "../loader/LoaderMini";

type UpdateButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label?: string;
};

export function UpdateButton({
  loading = false,
  disabled = false,
  onClick,
  label = "Update",
}: UpdateButtonProps) {
  return (
    <AppButton
      type="button"
      variant="outlined"
      disabled={disabled || loading}
      onClick={onClick}
      sx={{
        padding: "var(--padding-mini)",
        boxShadow: 0,
        border: "var(--border-standart)",
        color: "var(--color-gunmetal)",
        bgcolor: "var(--color-lemon-chiffon)",
        "&:hover": {
          bgcolor: "var(--color-vanilla)",
          borderColor: "var(--color-vanilla)",
        },
      }}
    >
      {loading ? <LoaderMini /> : label}
    </AppButton>
  );
}
