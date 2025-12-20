import type { SerialPortSettings } from "./serial-port";

export type MboxCounterDevices = {
  device_id: number;
  name: string;
  serial: number;
  enabled: boolean;
};

export type MboxCounterSettings = {
  port: SerialPortSettings;
  poll_interval: number;
  devices: MboxCounterDevices[];
};
