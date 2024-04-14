import axios from 'axios';
import { useState } from 'react';

type UsePostState<T, U> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  post: (postData: U) => void;
};

/**
 * Custom hook for making POST requests with state management.
 *
 * @param url The URL to make the POST request to.
 * @returns The state of the request including the data, loading status, errors, and a function to execute the POST.
 */
const usePost = <T, U>(url: string): UsePostState<T, U> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const post = async (postData: U) => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('idToken');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post<T>(url, postData, { headers });
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Manejo específico de errores Axios
        setError(new Error(error.response?.data?.message || error.message));
      } else {
        // Manejo de errores generales
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, post };
};

export default usePost;
