import type {
  EasySerialSettings,
  ModbusRTUSettings,
  ModbusTCPSettings,
} from "../../../types";
import { buildEasySerialConfigDefault } from "./easy-serial/easySerialFormDefaults";
import { buildModbusRtuConfigDefault } from "./modbus/modbusRtuFormDefaults";
import { buildModbusTcpConfigDefault } from "./modbus/modbusTcpFormDefaults";

export const USED_LOGGERS = [
  "easy_serial",
  "modbus_rtu",
  "modbus_tcp",
] as const;

export type UsedLoggerType = (typeof USED_LOGGERS)[number];

// type _check = UsedLoggerType extends LoggerTypeRegistry ? true : never;

type LoggerConfigMap = {
  easy_serial: EasySerialSettings;
  modbus_rtu: ModbusRTUSettings;
  modbus_tcp: ModbusTCPSettings;
};

export const LOGGER_CONFIG_BUILDERS: {
  [K in UsedLoggerType]: () => LoggerConfigMap[K];
} = {
  easy_serial: buildEasySerialConfigDefault,
  modbus_rtu: buildModbusRtuConfigDefault,
  modbus_tcp: buildModbusTcpConfigDefault,
};
