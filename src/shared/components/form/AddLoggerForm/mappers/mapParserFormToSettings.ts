import type {
  EasySerialField,
  EasySerialParserSettings,
} from "../../../../types";
import type { LoggerFormValues } from "../loggerForm.types";

export function mapParserFormToSettings(
  values: LoggerFormValues
): EasySerialParserSettings {
  const parser = values.easy_serial?.parser;

  return {
    preamble: parser?.preamble ?? null,
    terminator: parser?.terminator ?? "",
    separator: parser?.separator ?? "",
    encoding: parser?.encoding ?? "",
    fields: (parser?.fields ?? []).map(
      (field): EasySerialField => ({
        index: Number(field.index ?? 0),
        name: field.name ?? "",
        type: field.type,
        format: field.format || null,
      })
    ),
  };
}
