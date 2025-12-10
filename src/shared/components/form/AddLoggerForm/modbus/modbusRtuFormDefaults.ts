import type { ModbusRTUSettings } from "../../../../types";

export const defaultModbusRtuSettings: ModbusRTUSettings = {
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
  poll_interval: 1,
  slaves: [],
};

export function buildModbusRtuConfigDefault(): ModbusRTUSettings {
  return { ...defaultModbusRtuSettings };
}
