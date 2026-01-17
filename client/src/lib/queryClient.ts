import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { handleMockRequest } from "./mockApi";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  // Route to mock when calling internal API during offline mode
  if (url.startsWith("/api")) {
    const mock = await handleMockRequest(method, url, data);
    await throwIfResNotOk(mock as unknown as Response);
    return mock as unknown as Response;
  }

  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const url = queryKey.join("/") as string;

    if (url.startsWith("/api")) {
      const mock = await handleMockRequest("GET", url);
      if (unauthorizedBehavior === "returnNull" && mock.status === 401) {
        return null;
      }
      if (!mock.ok) {
        const txt = (await mock.text()) || String(mock.status);
        throw new Error(`${mock.status}: ${txt}`);
      }
      return await mock.json();
    }

    const res = await fetch(url, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
