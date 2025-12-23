import { Box } from "@mui/material";
import { StartButton } from "../ui/button/StartButton";
import { StopButton } from "../ui/button/StopButton";
import { RestartButton } from "../ui/button/RestartButton";

type RuntimeControlsProps = {
  disabled: boolean;
  isStarting: boolean;
  isStopping: boolean;
  isRestarting: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
};

export function RuntimeControls({
  disabled,
  isStarting,
  isStopping,
  isRestarting,
  onStart,
  onStop,
  onRestart,
}: RuntimeControlsProps) {
  return (
    <Box display="flex" gap="var(--gap-standart)">
      <StartButton onClick={onStart} loading={isStarting} disabled={disabled} />
      <StopButton onClick={onStop} loading={isStopping} disabled={disabled} />
      <RestartButton
        onClick={onRestart}
        loading={isRestarting}
        disabled={disabled}
      />
    </Box>
  );
}
