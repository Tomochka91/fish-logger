import { Button, Stack } from "@mui/material";
import { BsPause, BsPlay, BsTrash3 } from "react-icons/bs";

type DebugControlsProps = {
  autoscroll: boolean;
  onToggleAutoscroll: () => void;
  onClear: () => void;
};

const baseButtonSx = {
  fontFamily: "var(--secondary-font)",
  fontSize: "var(--medium-font-size)",
  lineHeight: "var(--line-height-medium)",
  padding: "var(--padding-extra)",
  borderRadius: "var(--border-radius-medium)",
  textTransform: "var(--text-uppercase)",
  gap: "var(--gap-standart)",
  color: "var(--color-gunmetal)",
  boxShadow: 2,
  border: "var(--border-standart)",
  whiteSpace: "nowrap",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "28rem",

  "& .MuiButton-startIcon": {
    minWidth: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export function DebugControls({
  autoscroll,
  onToggleAutoscroll,
  onClear,
}: DebugControlsProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{}}
    >
      <Button
        variant="outlined"
        size="large"
        startIcon={<BsTrash3 />}
        onClick={onClear}
        sx={{
          ...baseButtonSx,
          "&:hover": {
            bgcolor: "var(--color-lemon-chiffon)",
          },
        }}
      >
        Clear
      </Button>

      <Button
        variant={autoscroll ? "contained" : "outlined"}
        size="small"
        startIcon={autoscroll ? <BsPause /> : <BsPlay />}
        onClick={onToggleAutoscroll}
        sx={{
          ...baseButtonSx,
          "&:hover": {
            bgcolor: "var(--color-tropical-mint)",
          },
          ...(autoscroll
            ? {
                backgroundColor: "var(--color-tropical-mint)",
                "&:hover": {
                  bgcolor: "var(--color-lemon-chiffon)",
                },
              }
            : {}),
        }}
      >
        Autoscroll: {autoscroll ? "On" : "Off"}
      </Button>
    </Stack>
  );
}
