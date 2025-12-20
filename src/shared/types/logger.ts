import type { EasySerialSettings } from "./logger-easy-serial";
import type { MboxSettings } from "./logger-mbox";
import type { MboxCounterSettings } from "./logger-mbox-counter";
import type { ModbusRTUSettings, ModbusTCPSettings } from "./logger-modbus";

export type LoggerTypeRegistry =
  | "easy_serial"
  | "mbox"
  | "modbus_rtu"
  | "modbus_tcp"
  | "mbox_counter";

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
  modbus_tcp: null;
  mbox: null;
  mbox_counter: null;
};

export type ModbusRtuLogger = LoggerBase & {
  type: "modbus_rtu";
  modbus_rtu: ModbusRTUSettings;
  easy_serial: null;
  modbus_tcp: null;
  mbox: null;
  mbox_counter: null;
};

export type ModbusTcpLogger = LoggerBase & {
  type: "modbus_tcp";
  modbus_tcp: ModbusTCPSettings;
  easy_serial: null;
  modbus_rtu: null;
  mbox: null;
  mbox_counter: null;
};

export type MboxLogger = LoggerBase & {
  type: "mbox";
  mbox: MboxSettings;
  modbus_tcp: null;
  easy_serial: null;
  modbus_rtu: null;
  mbox_counter: null;
};

export type MboxCounterLogger = LoggerBase & {
  type: "mbox_counter";
  mbox_counter: MboxCounterSettings;
  mbox: null;
  modbus_tcp: null;
  easy_serial: null;
  modbus_rtu: null;
};

// Logger from API
export type Logger =
  | EasySerialLogger
  | ModbusRtuLogger
  | ModbusTcpLogger
  | MboxLogger
  | MboxCounterLogger;

// Logger list
export type LoggerList = Logger[];

// Logs
export type LogsMessage = {
  success: boolean;
  data: {
    conn_id: number;
    name: string;
    registered: boolean;
    messages: string[];
    errors: string[];
  };
  error: string;
};
