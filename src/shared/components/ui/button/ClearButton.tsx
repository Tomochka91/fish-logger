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
      startIcon={<BsTrash />}
      onClick={onClick}
      sx={{
        "&:hover": {
          bgcolor: "var(--color-lemon-chiffon)",
        },
      }}
    >
      {label}
    </AppButton>
  );
}
