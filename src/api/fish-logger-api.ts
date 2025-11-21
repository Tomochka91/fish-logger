import type { DBaction, DBSettings } from "../shared/types/types";

const URL = import.meta.env.VITE_FISH_LOGGER_API_URL;

type ApiBase = {
  success: boolean;
  error?: string;
};

type ApiSuccess<T> = ApiBase & {
  success: true;
} & T;

type ApiError = ApiBase & {
  success: false;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

type DBSettingsResponse = ApiResponse<{ data: DBSettings }>;

export type DbActionResponse = ApiResponse<null>;

type DBActionRequest = {
  action: DBaction;
  settings: DBSettings;
};

const checkResponse = async <T>(res: Response): Promise<T> => {
  const data = (await res.json()) as T;

  if (!res.ok) {
    const maybeError = data as ApiError;
    const message = maybeError.error || `Error ${res.status}`;
    throw new Error(message);
  }

  return data as T;
};

export const getDBSettings = async (): Promise<DBSettings> => {
  const data = await fetch(`${URL}/db/settings`).then((res) =>
    checkResponse<DBSettingsResponse>(res)
  );

  if (!data.success) {
    throw new Error(data.error || "Failed to load DB settings");
  }

  return data.data;
};

export const postDBSettings = async (
  action: DBActionRequest
): Promise<DbActionResponse> => {
  const data = await fetch(`${URL}/db/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(action),
  }).then((res) => checkResponse<DbActionResponse>(res));

  if (!data.success) {
    console.error(data.error);
    throw new Error();
  }

  return data;
};
