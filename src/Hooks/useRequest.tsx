import { useEffect, useState } from "react";

export default function useRequest(request: () => Promise<any>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError(""); // Сбрасываем ошибку при новом запросе

    const timer = setTimeout(() => {
      request()
        .then((response) => setData(response))
        .catch((error) => setError(error.message || "Произошла ошибка"))
        .finally(() => setLoading(false));
    }, 1000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, []); // Добавляем request в зависимости

  return [data, loading, error];
}
