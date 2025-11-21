import { Button, Stack } from "@mui/material";
import { BsPause, BsPlay, BsTrash3 } from "react-icons/bs";

type DebugControlsProps = {
  autoscroll: boolean;
  onToggleAutoscroll: () => void;
  onClear: () => void;
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
      sx={{ pt: 0.5 }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<BsTrash3 />}
        onClick={onClear}
      >
        Clear
      </Button>

      <Button
        variant={autoscroll ? "contained" : "outlined"}
        size="small"
        startIcon={autoscroll ? <BsPause /> : <BsPlay />}
        onClick={onToggleAutoscroll}
      >
        Autoscroll: {autoscroll ? "On" : "Off"}
      </Button>
    </Stack>
  );
}
