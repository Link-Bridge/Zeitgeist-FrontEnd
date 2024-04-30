import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { RequestMethods } from '../utils/constants';

/**
 * Hook for performing HTTP requests with generic type configuration.
 * @param endpoint - Example of an endpoint: '/dummy/data'.
 * @param method - HTTP method such as 'GET', 'POST', 'PUT', 'DELETE'.
 *
 * @example
 * // To receive an array of "User" objects:
 * const { data, error, loading, sendRequest } = useHttp<User[]>("/users", "GET");
 *
 * @example
 * // To receive a specific "User" object:
 * const { data, error, loading, sendRequest } = useHttp<User>("/users", "GET");
 * sendRequest({ id: e224f1ff-7fbf-4f20-8b21-e6871449caa0 });
 *
 * @example
 * // To create a new user with POST:
 * const userInfo = { name: "John Doe", email: "john@example.com" };
 * const { data, error, loading, sendRequest } = useHttp<User>("/users", "POST");
 * sendRequest({}, userInfo, { 'Content-Type': 'application/json' });
 *
 * @example
 * // To update an existing user with PUT:
 * const updatedInfo = { name: "Jane Doe", email: "jane@example.com" };
 * const { data, error, loading, sendRequest } = useHttp<User>("/users/:id", "PUT");
 * sendRequest({}, updatedInfo, { 'Content-Type': 'application/json' });
 *
 * @example
 * // To delete a user with DELETE:
 * const { data, error, loading, sendRequest } = useHttp<null>("/users/:id", "DELETE");
 * sendRequest();
 *
 * @typeParam T - The type of the expected response. Define this type according to the data returned by the API.
 */

interface HttpHook<T> {
  data: T | null;
  error: Error | AxiosError | null;
  loading: boolean;
  sendRequest: (
    params?: Record<string, unknown>,
    body?: Record<string, unknown>,
    customHeaders?: Record<string, string>
  ) => Promise<void>;
}

const useHttp = <T>(endpoint: string, method: RequestMethods): HttpHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;

  const sendRequest = async (
    params: Record<string, unknown> = {},
    body: Record<string, unknown> | null = null,
    customHeaders: Record<string, string> = {}
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    const idToken = sessionStorage.getItem('idToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
      ...customHeaders,
    };

    const options: AxiosRequestConfig = {
      method: method,
      url: `${BASE_URL}${endpoint}`,
      headers: headers,
      params: method === RequestMethods.GET ? params : {},
      data: method === RequestMethods.POST || method === RequestMethods.PUT ? body : null,
    };

    if (method === RequestMethods.DELETE) {
      options.params = params;
    }

    try {
      const response = await axios(options);
      setData(response.data as T);
    } catch (error) {
      console.log('Error:', error);
      setError(error as Error | AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
};

export default useHttp;
