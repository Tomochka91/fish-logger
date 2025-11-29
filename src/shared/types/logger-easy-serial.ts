import type { SerialPortSettings } from "./serial-port";

export type EasySerialField = {
  index: number;
  type: string;
  format: string | null;
};

export type EasySerialParserSettings = {
  preamble: string;
  terminator: string;
  separator: string;
  encoding: string;
  fields: EasySerialField[];
  variables: Record<string, number>;
};

export type EasySerialSettings = {
  port: SerialPortSettings;
  parser: EasySerialParserSettings;
};
