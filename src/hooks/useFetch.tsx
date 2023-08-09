import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string, initialState: T): [T, boolean] => {
  const [data, setData] = useState<T>(initialState);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading];
};
