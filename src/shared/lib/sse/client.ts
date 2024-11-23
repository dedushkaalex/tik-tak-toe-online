import { useEffect, useState } from "react";

export function useEventsSource<T>(url: string, defaultData: T) {
  const [data, setData] = useState<T>(defaultData);
  const [error, setError] = useState<unknown | undefined>();

  useEffect(() => {
    const gameEvents = new EventSource(url);

    gameEvents.addEventListener("message", (message) => {
      try {
        setData(JSON.parse(message.data));
      } catch (e) {
        setError(e);
      }
    });

    gameEvents.addEventListener("error", (e) => {
      setError(e);
    });

    return () => gameEvents.close();
  }, [url]);

  return {
    dataStream: data,
    errorStream: error,
  };
}
