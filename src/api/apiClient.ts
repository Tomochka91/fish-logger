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

// const checkResponse = async <T>(res: Response): Promise<T> => {
//   const data = (await res.json()) as T;

//   if (!res.ok) {
//     const maybeError = data as ApiError;
//     const message = maybeError.error || `Error ${res.status}`;
//     throw new Error(message);
//   }

//   return data as T;
// };

export const request = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = (await res.json()) as T;

  if (!res.ok) {
    const maybeError = data as ApiError;
    const message = maybeError.error || `Error ${res.status}`;
    throw new Error(message);
  }

  return data;
};
