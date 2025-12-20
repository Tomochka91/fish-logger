import type { MboxCounterSettings } from "../../../../types/logger-mbox-counter";

export const defaultMboxCounterSettings: MboxCounterSettings = {
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
  devices: [],
};

export function buildMboxCounterConfigDefault(): MboxCounterSettings {
  return { ...defaultMboxCounterSettings };
}
