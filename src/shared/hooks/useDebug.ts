import { useContext } from "react";
import { DebugContext } from "../context/debug/debugContext";

export function useDebug() {
  const context = useContext(DebugContext);
  if (!context) throw new Error("useDebug must be used inside DebugProvider");
  return context;
}
