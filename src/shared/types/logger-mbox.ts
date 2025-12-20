import type { SerialPortSettings } from "./serial-port";

export type MboxSettings = {
  port: SerialPortSettings;
  tare: number;
  treat_zero_as_error: boolean;
  treat_duplicate_as_error: boolean;
  error_label_zero: string;
  error_label_duplicate: string;
  encoding: string;
  ext_counter: boolean;
  counter_connection_id: number | null;
  counter_device_id: number | null;
  miss_strategy: "last" | "default";
  miss_default: string;
  miss_insert_limit: number;
  miss_error_label: string;
};
