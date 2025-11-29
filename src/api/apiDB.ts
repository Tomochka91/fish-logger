import type { DBaction, DBSettings } from "../shared/types";
import { request, type ApiResponse } from "./apiClient";

type DBSettingsResponse = ApiResponse<{ data: DBSettings }>;

export type DbActionResponse = ApiResponse<null>;

type DBActionRequest = {
  action: DBaction;
  settings: DBSettings;
};

export const getDBSettings = async (): Promise<DBSettings> => {
  const data = await request<DBSettingsResponse>("/db/settings");

  if (!data.success) {
    throw new Error(data.error || "Failed to load DB settings");
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
    console.error(data.error);
    throw new Error(data.error || "DB action failed");
  }

  return data;
};
