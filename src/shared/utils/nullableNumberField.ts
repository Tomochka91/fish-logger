import type { ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export function parseNullableNumberInput(
  raw: string
): number | null | undefined {
  if (raw === "") return null;
  const normalized = raw.replace(",", ".");

  if (normalized === ".") return undefined;

  const num = Number(normalized);
  return Number.isNaN(num) ? undefined : num;
}

export function makeNullableNumberChangeHandler<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(field: ControllerRenderProps<TFieldValues, TName>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNullableNumberInput(event.target.value);
    if (parsed === undefined) return;
    field.onChange(parsed);
  };
}
