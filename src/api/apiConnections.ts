import type { LoggerFormValues } from "../shared/components/form/AddLoggerForm/AddLoggerForm";
import { mapFormValuesToPayload } from "../shared/components/form/AddLoggerForm/mappers/mapFormValuesToPayload";
import type { Logger, LoggerList } from "../shared/types";
import { request } from "./apiClient";

// LOGGERS
export const getLoggerList = async (): Promise<LoggerList> => {
  const data = await request<LoggerList>("/connections/");
  return data;
};

export const postLogger = async (
  formValues: LoggerFormValues
): Promise<Logger> => {
  const payload = mapFormValuesToPayload(formValues);

  return await request<Logger>("/connections/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateLogger = async (
  id: number,
  formValues: LoggerFormValues
): Promise<Logger> => {
  const payload = mapFormValuesToPayload(formValues);

  return await request<Logger>(`/connections/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};

export const deleteLogger = async (id: number) => {
  return await request<void>(`/connections/${id}`, {
    method: "DELETE",
  });
};
