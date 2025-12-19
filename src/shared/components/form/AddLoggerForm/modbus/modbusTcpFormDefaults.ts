import type { ModbusTCPSettings } from "../../../../types";

export const defaultModbusTcpSettings: ModbusTCPSettings = {
  host: {
    address: "0.0.0.0",
    port: 1502,
    autoconnect: true,
    timeout: 1,
  },
  poll_interval: 1,
  slaves: [],
};

export function buildModbusTcpConfigDefault(): ModbusTCPSettings {
  return { ...defaultModbusTcpSettings };
}
