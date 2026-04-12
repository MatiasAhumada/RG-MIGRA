import { useState, useEffect, useCallback, useRef } from "react";

interface UseDataQueryOptions<T> {
  fetcher: () => Promise<T>;
  refetchInterval?: number;
  enabled?: boolean;
}

interface UseDataQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDataQuery<T>({
  fetcher,
  refetchInterval = 0,
  enabled = true,
}: UseDataQueryOptions<T>): UseDataQueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetcherRef = useRef(fetcher);

  fetcherRef.current = fetcher;

  const execute = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetcherRef.current();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error desconocido"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      execute();
    }
  }, [enabled, execute]);

  useEffect(() => {
    if (!enabled || refetchInterval <= 0) return;

    const interval = setInterval(execute, refetchInterval);

    return () => clearInterval(interval);
  }, [enabled, refetchInterval, execute]);

  return { data, isLoading, error, refetch: execute };
}
