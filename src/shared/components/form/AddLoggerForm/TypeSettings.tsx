import { Box } from "@mui/material";
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

  return (
    <Box
      sx={{
        width: "100%",
        // mb: "var(--margin-medium)",
        p: "var(--padding-mini)",
        borderRadius: "var(--border-radius-medium)",
        border: "var(--border-standart)",
        boxShadow: 1,
        fontFamily: "var(--secondary-font)",

        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0, // 💥 самое главное
        overflow: "auto", // позволяет внутренним табам ужиматься
      }}
    >
      {renderSettings(type)}
    </Box>
  );
}

function renderSettings(type: LoggerType) {
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
