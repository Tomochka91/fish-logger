import type { LogsMessage, Logger, LoggerList } from "../shared/types";
import { request } from "./apiClient";

// LOGGERS
export const getLoggerList = async (): Promise<LoggerList> => {
  const data = await request<LoggerList>("/connections/");
  return data;
};

export const postLogger = async (payload: Logger): Promise<Logger> => {
  return await request<Logger>("/connections/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateLogger = async (
  id: number,
  payload: Logger
): Promise<Logger> => {
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

export const getLogsMessage = async (id: number): Promise<LogsMessage> => {
  return await request<LogsMessage>(`/connections/runtime/${id}/logs`);
};
