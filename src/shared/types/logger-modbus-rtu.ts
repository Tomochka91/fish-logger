import type { SerialPortSettings } from "./serial-port";

export type ModbusRTUEncodingType =
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

export type ModbusRTUVariable = {
  name: string;
  address: number;
  encoding: ModbusRTUEncodingType;
  k: number;
  b: number;
  default: number | null;
};

export type ModbusRTUSlave = {
  slave_name: string;
  slave_id: number;
  variables: ModbusRTUVariable[];
};

export type ModbusRTUSettings = {
  port: SerialPortSettings;
  poll_interval: number;
  slaves: ModbusRTUSlave[];
};
