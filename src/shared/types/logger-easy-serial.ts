import type { SerialPortSettings } from "./serial-port";

export type EasySerialFieldType = "string" | "int" | "float" | "datetime";

export type EasySerialField = {
  index: number;
  name: string;
  type: EasySerialFieldType;
  format: string | null;
};

export type EasySerialParserSettings = {
  preamble: string | null;
  terminator: string;
  separator: string;
  encoding: string;
  fields: EasySerialField[];
};

export type EasySerialSettings = {
  port: SerialPortSettings;
  parser: EasySerialParserSettings;
};

export type EasySerialParserTest = {
  raw_text: string;
  parser_settings: EasySerialParserSettings;
};

export type EasySerialParserTestResponse = {
  parsed: Record<string, unknown>;
  error: string | null;
};
