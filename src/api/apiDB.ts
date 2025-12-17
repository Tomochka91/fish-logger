import type { DBaction, DBSettings } from "../shared/types";
import { request, type ApiResponse, type RequestError } from "./apiClient";

type DBSettingsResponse = ApiResponse<{ data: DBSettings }>;

export type DbActionResponse = ApiResponse<null>;

type DBActionRequest = {
  action: DBaction;
  settings: DBSettings;
};

export const getDBSettings = async (): Promise<DBSettings> => {
  const data = await request<DBSettingsResponse>("/db/settings");

  if (!data.success) {
    throw {
      status: 200,
      message: data.error || "Failed to load DB settings",
      raw: data,
    } satisfies RequestError;
  }

  return data.data;
};

export const postDBSettings = async (
  action: DBActionRequest
): Promise<DbActionResponse> => {
  const data = await request<DbActionResponse>("/db/settings", {
    method: "POST",
    body: JSON.stringify(action),
  });

  if (!data.success) {
    throw {
      status: 200,
      message: data.error || "DB action failed",
      raw: data,
    } satisfies RequestError;
  }

  return data;
};
