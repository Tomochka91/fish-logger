type FastApiErrorItem = { msg?: string };
type FastApiValidationError = { detail?: FastApiErrorItem[] };

export function getFirstFastApiMsg(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const detail = (data as FastApiValidationError).detail;
  if (!Array.isArray(detail) || detail.length === 0) return null;

  const msg = detail[0]?.msg;
  return typeof msg === "string" && msg.trim() ? msg : null;
}

export function hasErrorMessage(data: unknown): data is { error: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "error" in data &&
    typeof (data as { error?: unknown }).error === "string"
  );
}

export function getErrorMessage(err: unknown, fallback: string): string {
  if (err && typeof err === "object") {
    const status = (err as { status?: unknown }).status;
    const message = (err as { message?: unknown }).message;
    const raw = (err as { raw?: unknown }).raw;

    if (status === 422) {
      const fastMsg = getFirstFastApiMsg(raw);
      if (fastMsg) return fastMsg;

      if (typeof message === "string" && message.trim()) return message;

      return "Validation error";
    }

    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }

  if (err instanceof Error && err.message.trim()) {
    return err.message;
  }

  return fallback;
}
