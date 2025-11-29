import { Stack } from "@mui/material";
import { ClearButton } from "../ui/button/ClearButton";
import { AutoscrollButton } from "../ui/button/AutoscrollButton";

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
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ClearButton onClick={onClear} label="Clear logs" />
      <AutoscrollButton onToggle={onToggleAutoscroll} autoscroll={autoscroll} />
    </Stack>
  );
}
