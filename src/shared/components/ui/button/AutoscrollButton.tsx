import { BsPause, BsPlay } from "react-icons/bs";
import { AppButton } from "./AppButton";

type AutoscrollButtonProps = {
  autoscroll: boolean;
  onToggle: () => void;
};

export function AutoscrollButton({
  autoscroll,
  onToggle,
}: AutoscrollButtonProps) {
  const isOn = autoscroll;

  return (
    <AppButton
      variant={isOn ? "contained" : "outlined"}
      size="small"
      startIcon={isOn ? <BsPause /> : <BsPlay />}
      onClick={onToggle}
      sx={{
        justifyContent: "space-between",
        minWidth: "22rem",
        "&:hover": {
          bgcolor: "var(--color-tropical-mint)",
        },
        ...(isOn
          ? {
              backgroundColor: "var(--color-tropical-mint)",
              "&:hover": {
                bgcolor: "var(--color-lemon-chiffon)",
              },
            }
          : {}),
      }}
    >
      Autoscroll: {isOn ? "On" : "Off"}
    </AppButton>
  );
}
