import type {
  EasySerialSettings,
  LoggerBase,
  ModbusRTUSettings,
  ModbusTCPSettings,
} from "../../../types";

export type EasySerialLoggerFormType = LoggerBase & {
  type: "easy_serial";
  easy_serial: EasySerialSettings;
  modbus_rtu: null;
  modbus_tcp: null;
};

export type ModbusRtuLoggerFormType = LoggerBase & {
  type: "modbus_rtu";
  modbus_rtu: ModbusRTUSettings;
  easy_serial: null;
  modbus_tcp: null;
};

export type ModbusTcpLoggerFormType = LoggerBase & {
  type: "modbus_tcp";
  modbus_tcp: ModbusTCPSettings;
  modbus_rtu: null;
  easy_serial: null;
};

export type LoggerFormValues =
  | EasySerialLoggerFormType
  | ModbusRtuLoggerFormType
  | ModbusTcpLoggerFormType;
