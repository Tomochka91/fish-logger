import { useStartLogger } from "./useStartLogger";
import { useStopLogger } from "./useStopLogger";
import { useRestartLogger } from "./useRestartLogger";

export function useRuntimeControls() {
  const { runtimeStart, isStarting } = useStartLogger();
  const { runtimeStop, isStopping } = useStopLogger();
  const { runtimeRestart, isRestarting } = useRestartLogger();

  return {
    runtimeStart,
    isStarting,
    runtimeStop,
    isStopping,
    runtimeRestart,
    isRestarting,
  };
}
