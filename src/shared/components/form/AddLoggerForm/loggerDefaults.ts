import type { LoggerBase } from "../../../types";
import type { LoggerFormValues } from "./loggerForm.types";
import {
  LOGGER_CONFIG_BUILDERS,
  USED_LOGGERS,
  type UsedLoggerType,
} from "./loggerRegistry";

export const MBOX_DEFAULT_QUERY_TEMPLATE =
  "INSERT INTO storehouse_view VALUES (DEFAULT, DEFAULT, DEFAULT, {mbox_id}, {on_error}, NULL, {created_at}, {fish_name}, {fish_grade}, {lot}, {n_weight}, {r_weight}, {sn}, {error_info}, {tare});";

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
    query_template:
      type === "mbox"
        ? MBOX_DEFAULT_QUERY_TEMPLATE
        : defaultLoggerCommonFields.query_template,
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
