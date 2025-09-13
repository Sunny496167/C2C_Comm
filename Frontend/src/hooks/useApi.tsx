import { useState, useCallback } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions<T> {
  body?: T;
  headers?: HeadersInit;
}

export const useApi = <T = unknown, R = unknown>(
  baseUrl: string = import.meta.env.VITE_API_URL
) => {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (
      endpoint: string,
      method: HttpMethod = "GET",
      options?: ApiOptions<T>
    ) => {
      setLoading(true);
      setError(null);

      try {
        const url = `${baseUrl}${endpoint}`;
        const headers = {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        };

        // In your useApi hook's fetchData function
        const config: RequestInit = {
          method,
          headers,
          credentials: "include", // Ensure this is present
        };

        if (options?.body) {
          config.body = JSON.stringify(options.body);
        }

        const response = await fetch(url, config);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        const result = contentType?.includes("application/json")
          ? await response.json()
          : await response.text();

        setData(result as R);
        return result as R;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { data, loading, error, fetchData };
};
