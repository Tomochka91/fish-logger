import type {
  EasySerialSettings,
  LoggerBase,
  ModbusRTUSettings,
  ModbusTCPSettings,
} from "../../../types";
import type { MboxSettings } from "../../../types/logger-mbox";
import type { MboxCounterSettings } from "../../../types/logger-mbox-counter";

export type EasySerialLoggerFormType = LoggerBase & {
  type: "easy_serial";
  easy_serial: EasySerialSettings;
  modbus_rtu: null;
  modbus_tcp: null;
  mbox: null;
  mbox_counter: null;
};

export type ModbusRtuLoggerFormType = LoggerBase & {
  type: "modbus_rtu";
  modbus_rtu: ModbusRTUSettings;
  easy_serial: null;
  modbus_tcp: null;
  mbox: null;
  mbox_counter: null;
};

export type ModbusTcpLoggerFormType = LoggerBase & {
  type: "modbus_tcp";
  modbus_tcp: ModbusTCPSettings;
  modbus_rtu: null;
  easy_serial: null;
  mbox: null;
  mbox_counter: null;
};

export type MboxLoggerFormType = LoggerBase & {
  type: "mbox";
  mbox: MboxSettings;
  modbus_tcp: null;
  modbus_rtu: null;
  easy_serial: null;
  mbox_counter: null;
};

export type MboxCounterLoggerFormType = LoggerBase & {
  type: "mbox_counter";
  mbox_counter: MboxCounterSettings;
  mbox: null;
  modbus_tcp: null;
  modbus_rtu: null;
  easy_serial: null;
};

export type LoggerFormValues =
  | EasySerialLoggerFormType
  | ModbusRtuLoggerFormType
  | ModbusTcpLoggerFormType
  | MboxLoggerFormType
  | MboxCounterLoggerFormType;
