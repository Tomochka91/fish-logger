import type { SerialPortSettings } from "./serial-port";

export type ModbusRTUVariable = {
  name: string;
  address: number;
  encoding: string;
  k: number;
  b: number;
  default: number | null;
};

export type ModbusRTUSlave = {
  slave_id: number;
  variables: ModbusRTUVariable[];
};

export type ModbusRTUSettings = {
  port: SerialPortSettings;
  poll_interval: number;
  slaves: ModbusRTUSlave[];
};
