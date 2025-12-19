import type { ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export function parseNumberInput(raw: string): number | "" | null {
  if (raw === "") return "";
  const normalized = raw.replace(",", ".");

  if (normalized === ".") return null;

  const num = Number(normalized);
  return Number.isNaN(num) ? null : num;
}

export function makeNumberChangeHandler<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(field: ControllerRenderProps<TFieldValues, TName>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNumberInput(event.target.value);
    if (parsed === null) return;
    field.onChange(parsed);
  };
}
