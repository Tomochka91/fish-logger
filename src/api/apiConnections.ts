import type {
  LogsMessage,
  Logger,
  LoggerList,
  EasySerialParserTest,
  EasySerialParserTestResponse,
  LoggerStatus,
  MetricsMessage,
} from "../shared/types";
import type { MboxAvailableCounters } from "../shared/types/logger-mbox";
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

export const getMetrics = async (id: number): Promise<MetricsMessage> => {
  return await request<MetricsMessage>(`/connections/runtime/${id}/metrics`);
};

export const postEasySerialParserTest = async (
  payload: EasySerialParserTest
): Promise<EasySerialParserTestResponse> => {
  return request<EasySerialParserTestResponse>("/easy-serial/parser/test", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getLoggerStatus = async (id: number): Promise<LoggerStatus> => {
  return await request<LoggerStatus>(`/connections/runtime/${id}/status`);
};

export const startLogger = async (id: number): Promise<LoggerStatus> => {
  return await request<LoggerStatus>(`/connections/runtime/${id}/start`, {
    method: "POST",
  });
};

export const stopLogger = async (id: number): Promise<LoggerStatus> => {
  return await request<LoggerStatus>(`/connections/runtime/${id}/stop`, {
    method: "POST",
  });
};

export const restartLogger = async (id: number): Promise<LoggerStatus> => {
  return await request<LoggerStatus>(`/connections/runtime/${id}/restart`, {
    method: "POST",
  });
};

export const getMboxAvailableCounters =
  async (): Promise<MboxAvailableCounters> => {
    const data = await request<MboxAvailableCounters>(
      "/mbox/available-counters"
    );
    console.log(data);
    return data;
  };

export const startMboxLogger = async (
  id: number,
  send: boolean
): Promise<string> => {
  return await request<string>(`/mbox/${id}/start-command`, {
    method: "POST",
    body: JSON.stringify({ send }),
  });
};
