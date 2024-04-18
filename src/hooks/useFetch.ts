import axios from 'axios';
import { useEffect, useState } from 'react';

type UseFetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Hook personalizado para realizar solicitudes fetch con manejo de estados.
 *
 * @param url La URL a la que hacer la solicitud fetch.
 * @returns El estado de la solicitud incluyendo los datos, estado de carga y errores.
 */
const useFetch = <T>(url: string): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
        setError(null);
      } catch (error) {
        if (error) {
          if (axios.isAxiosError(error)) {
            setError(new Error(error.response?.data?.message || error.message));
          }
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
