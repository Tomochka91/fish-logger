import type { Logger } from "../../../../types";
import type { LoggerFormValues } from "../loggerForm.types";

export function mapLoggerToFormValues(logger: Logger): LoggerFormValues {
  return {
    ...logger,
    db_user: logger.db_user ?? "",
    db_password: logger.db_password ?? "",
    table_name: logger.table_name ?? "",
    query_template: logger.query_template ?? "",
  };
}
