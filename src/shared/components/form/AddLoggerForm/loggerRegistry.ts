import type { EasySerialSettings, ModbusRTUSettings } from "../../../types";
import { buildEasySerialConfigDefault } from "./easy-serial/easySerialFormDefaults";
import { buildModbusRtuConfigDefault } from "./modbus/modbusRtuFormDefaults";

export const USED_LOGGERS = ["easy_serial", "modbus_rtu"] as const;

export type UsedLoggerType = (typeof USED_LOGGERS)[number];

// type _check = UsedLoggerType extends LoggerTypeRegistry ? true : never;

type LoggerConfigMap = {
  easy_serial: EasySerialSettings;
  modbus_rtu: ModbusRTUSettings;
};

export const LOGGER_CONFIG_BUILDERS: {
  [K in UsedLoggerType]: () => LoggerConfigMap[K];
} = {
  easy_serial: buildEasySerialConfigDefault,
  modbus_rtu: buildModbusRtuConfigDefault,
};
