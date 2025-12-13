import type { ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export function parseNullableNumberInput(raw: string): number | null {
  if (raw === "") return null;

  const normalized = raw.replace(",", ".");
  const num = Number(normalized);

  return Number.isNaN(num) ? null : num;
}

export function makeNullableNumberChangeHandler<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(field: ControllerRenderProps<TFieldValues, TName>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(parseNullableNumberInput(event.target.value));
  };
}
