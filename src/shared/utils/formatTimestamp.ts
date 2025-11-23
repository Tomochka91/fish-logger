import { format } from "date-fns";

export function formatTimestamp(input: Date): string {
  const formatted = format(input, "yy/MM/dd HH:mm:ss");

  return formatted;
}
