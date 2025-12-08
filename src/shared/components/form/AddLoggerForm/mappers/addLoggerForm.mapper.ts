import type { Logger } from "../../../../types";
import type { LoggerFormValues } from "../AddLoggerForm.types";

export function mapLoggerToFormValues(logger: Logger): LoggerFormValues {
  const isEasySerial = logger.type === "easy_serial" && logger.easy_serial;

  return {
    name: logger.name,
    type: logger.type,
    autostart: logger.autostart,
    db_user: logger.db_user ?? "",
    db_password: logger.db_password ?? "",
    table_name: logger.table_name ?? "",
    enabled: Boolean(logger.db_user || logger.table_name),
    query_template: logger.query_template ?? "",
    easy_serial: isEasySerial
      ? {
          port: {
            port: logger.easy_serial.port.port ?? "",
            baudrate: logger.easy_serial.port.baudrate,
            databits: logger.easy_serial.port.databits,
            parity: logger.easy_serial.port.parity,
            stopbits: logger.easy_serial.port.stopbits,
            flowcontrol: logger.easy_serial.port.flowcontrol,
            autoconnect: logger.easy_serial.port.autoconnect,
          },
          parser: {
            preamble: logger.easy_serial.parser.preamble ?? "",
            terminator: logger.easy_serial.parser.terminator ?? "\\n",
            separator: logger.easy_serial.parser.separator ?? ";",
            encoding: logger.easy_serial.parser.encoding ?? "utf-8",
            fields:
              logger.easy_serial.parser.fields?.map((field) => ({
                ...field,
                name: field.name ?? "",
                index: field.index ?? 0,
                format: field.format ?? "",
              })) ?? [],
          },
        }
      : null,
  };
}
