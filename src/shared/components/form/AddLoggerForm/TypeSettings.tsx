import { Box } from "@mui/material";
import type { LoggerTypeRegistry } from "../../../types";
import { EasySerialSettings } from "./easy-serial/EasySerialSettings";
import { MboxSettings } from "./mbox/MboxSettings";
import { ModbusRtuSettings } from "./modbus/ModbusRtuSettings";
import { ModbusTcpSettings } from "./modbus/ModbusTcpSettings";
import { MboxCounterSettings } from "./mbox/MboxCounterSettings";

interface TypeSettingsProps {
  type: LoggerTypeRegistry;
}

export function TypeSettings({ type }: TypeSettingsProps) {
  if (!type) return null;

  return (
    <Box
      sx={{
        width: "100%",
        p: "var(--pading-equal)",
        borderRadius: "var(--border-radius-medium)",
        border: "var(--border-standart)",
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        overflow: "auto",
      }}
    >
      {renderSettings(type)}
    </Box>
  );
}

function renderSettings(type: LoggerTypeRegistry) {
  switch (type) {
    case "easy_serial":
      return <EasySerialSettings />;
    case "mbox":
      return <MboxSettings />;
    case "modbus_rtu":
      return <ModbusRtuSettings />;
    case "modbus_tcp":
      return <ModbusTcpSettings />;
    case "mbox_counter":
      return <MboxCounterSettings />;
    default:
      return null;
  }
}
