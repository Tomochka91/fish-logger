import { BsTrash } from "react-icons/bs";
import { AppButton } from "./AppButton";

type ClearButtonProps = {
  label?: string;
  onClick: () => void;
};

export function ClearButton({ label = "Reset", onClick }: ClearButtonProps) {
  return (
    <AppButton
      variant="outlined"
      size="large"
      startIcon={<BsTrash />}
      onClick={onClick}
      sx={{
        // minWidth: "18rem",
        "&:hover": {
          bgcolor: "var(--color-lemon-chiffon)",
        },
      }}
    >
      {label}
    </AppButton>
  );
}
