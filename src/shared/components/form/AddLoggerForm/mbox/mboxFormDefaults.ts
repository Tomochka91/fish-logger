import type { MboxSettings } from "../../../../types/logger-mbox";

export const defaultMboxSettings: MboxSettings = {
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
  tare: 0,
  treat_zero_as_error: true,
  treat_duplicate_as_error: true,
  error_label_zero: "no weight",
  error_label_duplicate: "no weight",
  encoding: "ascii",
  ext_counter: false,
  counter_connection_id: 0,
  counter_device_id: 0,
  miss_strategy: "last",
  miss_default: "",
  miss_insert_limit: 1,
  miss_error_label: "counter miss",
};

export function buildMboxConfigDefault(): MboxSettings {
  return { ...defaultMboxSettings };
}
