import type { LoggerType } from "../../../types";
import { EasySerialSettings } from "./easy-serial/EasySerialSettings";
import { MboxSettings } from "./mbox/MboxSettings";
import { ModbusRtuSettings } from "./modbus/ModbusRtuSettings";
import { ModbusTcpSettings } from "./modbus/ModbusTcpSettings";

interface TypeSettingsProps {
  type: LoggerType;
}

export function TypeSettings({ type }: TypeSettingsProps) {
  if (!type) return null;

  switch (type) {
    case "easy_serial":
      return <EasySerialSettings />;

    case "mbox":
      return <MboxSettings />;

    case "modbus_rtu":
      return <ModbusRtuSettings />;

    case "modbus_tcp":
      return <ModbusTcpSettings />;

    default:
      return null;
  }
}
