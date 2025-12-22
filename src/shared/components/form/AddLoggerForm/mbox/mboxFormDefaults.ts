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
  mbox_id: 1,
  tare: 0,
  treat_zero_as_error: true,
  treat_duplicate_as_error: true,
  error_label_zero: "no weight",
  error_label_duplicate: "no weight",
  encoding: "ascii",
  ext_counter: false,
  counter_connection_id: 0,
  counter_device_id: 0,
  counter_clean_timeout: 6,
  counter_miss_timeout: 4,
  miss_strategy: "last",
  miss_default: {
    fish_name: "",
    fish_grade: "",
    n_weight: "",
    r_weight: "",
    sn: "",
  },
  miss_insert_limit: 1,
  miss_error_label: "scales error",
};

export function buildMboxConfigDefault(): MboxSettings {
  return { ...defaultMboxSettings };
}

export const MBOX_COUNTER_DEFAULTS = {
  counter_connection_id: defaultMboxSettings.counter_connection_id,
  counter_device_id: defaultMboxSettings.counter_device_id,
  counter_clean_timeout: defaultMboxSettings.counter_clean_timeout,
  counter_miss_timeout: defaultMboxSettings.counter_miss_timeout,
  miss_strategy: defaultMboxSettings.miss_strategy,
  miss_insert_limit: defaultMboxSettings.miss_insert_limit,
  miss_error_label: defaultMboxSettings.miss_error_label,
};
