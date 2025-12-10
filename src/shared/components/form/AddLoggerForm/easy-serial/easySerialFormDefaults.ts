import type { EasySerialSettings } from "../../../../types";

export const defaultEasySerialSettings: EasySerialSettings = {
  port: {
    port: "",
    baudrate: 9600,
    databits: 8,
    parity: "None",
    stopbits: 1,
    flowcontrol: "None",
    autoconnect: false,
    timeout: 1,
  },
  parser: {
    preamble: "",
    terminator: "\\n",
    separator: ";",
    encoding: "utf-8",
    fields: [],
  },
};

export function buildEasySerialConfigDefault(): EasySerialSettings {
  return { ...defaultEasySerialSettings };
}
