import type { ChangeEvent } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export function parseNumberInput(raw: string): number | "" {
  if (raw === "") return "";
  const num = Number(raw);
  return Number.isNaN(num) ? "" : num;
}

export function makeNumberChangeHandler<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>
>(field: ControllerRenderProps<TFieldValues, TName>) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    field.onChange(parseNumberInput(raw));
  };
}
