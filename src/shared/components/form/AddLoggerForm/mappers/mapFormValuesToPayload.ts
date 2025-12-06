import type { EasySerialField, LoggerType } from "../../../../types";
import type { LoggerFormValues } from "../AddLoggerForm.types";

const DEFAULT_SERIAL_TIMEOUT = 1;

export type NewLoggerPayload = {
  name: string;
  type: LoggerType;
  enabled: boolean;
  autostart: boolean;
  db_user: string;
  db_password: string;
  table_name: string;
  query_template: string;
  easy_serial: {
    port: {
      port: string;
      baudrate: number;
      databits: number;
      parity: string;
      stopbits: number;
      flowcontrol: string;
      autoconnect: boolean;
      timeout: number;
    };
    parser: {
      preamble: string;
      terminator: string;
      separator: string;
      encoding: string;
      fields: EasySerialField[];
    };
  } | null;
};

export function mapFormValuesToPayload(
  values: LoggerFormValues
): NewLoggerPayload {
  return {
    name: values.name.trim(),
    type: values.type,
    enabled: values.enabled,
    autostart: values.autostart,
    db_user: values.db_user.trim(),
    db_password: values.db_password,
    table_name: values.table_name.trim(),
    query_template: values.query_template,
    easy_serial:
      values.type === "easy_serial" && values.easy_serial
        ? {
            port: {
              ...values.easy_serial.port,
              timeout: DEFAULT_SERIAL_TIMEOUT,
            },
            parser: {
              ...values.easy_serial.parser,
            },
          }
        : null,
  };
}
