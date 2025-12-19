import type { SerialPortSettings } from "./serial-port";

export type ModbusEncodingType =
  | "u16"
  | "s16"
  | "u16_scaled"
  | "s16_scaled"
  | "u32_abcd"
  | "u32_cdab"
  | "s32_abcd"
  | "s32_cdab"
  | "u32_scaled_abcd"
  | "u32_scaled_cdab"
  | "s32_scaled_abcd"
  | "s32_scaled_cdab"
  | "f32_abcd"
  | "f32_cdab"
  | "f32_scaled_abcd"
  | "f32_scaled_cdab";

export type ModbusVariable = {
  name: string;
  address: number;
  encoding: ModbusEncodingType;
  k: number;
  b: number;
  default: number | null;
};

export type ModbusSlave = {
  slave_name: string;
  slave_id: number;
  variables: ModbusVariable[];
};

export type ModbusHost = {
  address: string;
  port: number;
  autoconnect: boolean;
  timeout: number;
};

export type ModbusRTUSettings = {
  port: SerialPortSettings;
  poll_interval: number;
  slaves: ModbusSlave[];
};

export type ModbusTCPSettings = {
  host: ModbusHost;
  poll_interval: number;
  slaves: ModbusSlave[];
};
