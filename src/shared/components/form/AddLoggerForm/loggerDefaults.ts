import type { LoggerBase } from "../../../types";
import type { LoggerFormValues } from "./loggerForm.types";
import {
  LOGGER_CONFIG_BUILDERS,
  USED_LOGGERS,
  type UsedLoggerType,
} from "./loggerRegistry";

export const defaultLoggerCommonFields: LoggerBase = {
  name: "",
  type: "easy_serial",
  autostart: false,
  db_user: "",
  db_password: "",
  table_name: "",
  enabled: false,
  query_template: "",
};

type LoggerFormDefaultsMap = {
  [K in UsedLoggerType]: Extract<LoggerFormValues, { type: K }>;
};

export function createLoggerDefaultValues<T extends UsedLoggerType>(
  type: T
): LoggerFormDefaultsMap[T] {
  const base: LoggerBase & { type: T } = {
    ...defaultLoggerCommonFields,
    type,
  };

  const configs: Partial<Record<UsedLoggerType, unknown>> = {};

  USED_LOGGERS.forEach((loggerType) => {
    if (loggerType === type) {
      const buildConfig = LOGGER_CONFIG_BUILDERS[loggerType] as () => unknown;
      configs[loggerType] = buildConfig();
    } else {
      configs[loggerType] = null;
    }
  });

  return {
    ...base,
    ...(configs as Record<UsedLoggerType, unknown>),
  } as LoggerFormDefaultsMap[T];
}
