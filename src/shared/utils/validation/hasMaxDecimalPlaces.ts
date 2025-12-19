export function hasMaxDecimalPlaces(
  value: unknown,
  maxDecimals: number
): boolean {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return true;
  }

  const factor = 10 ** maxDecimals;
  const scaled = value * factor;

  const tolerance = 1e-6;

  return Math.abs(scaled - Math.round(scaled)) < tolerance;
}

export const hasMax2Decimals = (value: unknown) =>
  hasMaxDecimalPlaces(value, 2);
