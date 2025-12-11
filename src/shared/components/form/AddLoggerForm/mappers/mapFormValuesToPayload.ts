import type { Logger } from "../../../../types";
import type { LoggerFormValues } from "../loggerForm.types";

export function mapFormValuesToPayload(values: LoggerFormValues): Logger {
  return {
    ...values,
    db_user: values.db_user || null,
    db_password: values.db_password || null,
    table_name: values.table_name || null,
    query_template: values.query_template || null,
  };
}
