import type { LoggerList } from "../shared/types";
import { request } from "./apiClient";

// LOGGERS
export const getLoggerList = async (): Promise<LoggerList> => {
  const data = await request<LoggerList>("/connections/");
  return data;
};
