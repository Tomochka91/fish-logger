import type { EasySerialSettings } from "./logger-easy-serial";
import type { ModbusRTUSettings } from "./logger-modbus-rtu";

export type LoggerTypeRegistry =
  | "easy_serial"
  | "mbox"
  | "modbus_rtu"
  | "modbus_tcp";

export type LoggerBase = {
  id?: number;
  name: string;
  type: LoggerTypeRegistry;
  autostart: boolean;
  db_user: string | null;
  db_password: string | null;
  table_name: string | null;
  enabled: boolean;
  query_template: string | null;
};

export type EasySerialLogger = LoggerBase & {
  type: "easy_serial";
  easy_serial: EasySerialSettings;
  modbus_rtu: null;
};

export type ModbusRtuLogger = LoggerBase & {
  type: "modbus_rtu";
  easy_serial: null;
  modbus_rtu: ModbusRTUSettings;
};

// Logger from API
export type Logger = EasySerialLogger | ModbusRtuLogger;

// Logger list
export type LoggerList = Logger[];
