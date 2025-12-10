import type {
  EasySerialSettings,
  LoggerBase,
  ModbusRTUSettings,
} from "../../../types";

// 🔹 Форма для easy_serial
export type EasySerialLoggerFormType = LoggerBase & {
  type: "easy_serial";
  easy_serial: EasySerialSettings;
  modbus_rtu: null;
};

// 🔹 Форма для modbus_rtu
export type ModbusRtuLoggerFormType = LoggerBase & {
  type: "modbus_rtu";
  easy_serial: null;
  modbus_rtu: ModbusRTUSettings;
};

// 🔹 Объединённый тип формы
export type LoggerFormValues =
  | EasySerialLoggerFormType
  | ModbusRtuLoggerFormType;
