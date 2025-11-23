import { useEffect, useState } from "react";

export default function useRequest(request: () => Promise<any>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      request()
        .then((response) => setData(response))
        .catch((error) => setError(error.message || "Произошла ошибка"))
        .finally(() => setLoading(false));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return [data, loading, error];
}
