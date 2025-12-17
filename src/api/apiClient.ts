import { hasErrorMessage } from "../shared/utils/apiHelpers";

export const BASE_URL = import.meta.env.VITE_FISH_LOGGER_API_URL;

export type ApiBase = {
  success?: boolean;
  error?: string;
};

export type ApiSuccess<T> = ApiBase & {
  success?: true;
} & T;

export type ApiError = ApiBase & {
  success?: false;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type RequestError = {
  status: number;
  message: string;
  raw?: unknown;
};

export const request = async <TResponse>(
  path: string,
  options?: RequestInit
): Promise<TResponse> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (res.status === 204) {
    return undefined as TResponse;
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    throw {
      status: res.status,
      message: hasErrorMessage(data) ? data.error : `Error ${res.status}`,
      raw: data,
    } satisfies RequestError;
  }

  return data as TResponse;
};
