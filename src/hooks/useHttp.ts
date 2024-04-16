import axios, { AxiosRequestConfig, Method } from 'axios';
import { useState } from 'react';

interface HttpHook<T> {
  data: T | null; // T es el tipo de la respuesta esperada
  error: Error | null;
  loading: boolean;
  sendRequest: (
    params?: Record<string, any>,
    body?: Record<string, any>,
    headers?: Record<string, string>
  ) => Promise<void>;
}

/**
 * Hook para realizar solicitudes HTTP con configuración de tipos genéricos.
 * @param endpoint - Ejemplo de endpoint: '/dummy/findAll'.
 * @param method - Método HTTP como 'GET', 'POST', 'PUT', 'DELETE'.
 *
 * @example
 * // Para recibir un array de objetos "Usuario":
 * const { data, error, loading, sendRequest } = useHttp<User[]>("/users", "GET");
 *
 * @example
 * // Para recibir un objeto específico de "Usuario":
 * const { data, error, loading, sendRequest } = useHttp<User>("/users", "GET");
 *
 * @example
 * // Crear un nuevo usuario con POST:
 * const userInfo = { name: "John Doe", email: "john@example.com" };
 * const { data, error, loading, sendRequest } = useHttp<User>("/users", "POST");
 * sendRequest({}, userInfo, { 'Content-Type': 'application/json' });
 *
 * @example
 * // Actualizar un usuario existente con PUT:
 * const updatedInfo = { name: "Jane Doe", email: "jane@example.com" };
 * const { data, error, loading, sendRequest } = useHttp<User>("/users/:id", "PUT");
 * sendRequest({}, updatedInfo, { 'Content-Type': 'application/json' });
 *
 * @example
 * // Eliminar un usuario con DELETE:
 * const { data, error, loading, sendRequest } = useHttp<null>("/users/:id", "DELETE");
 * sendRequest();
 *
 * @typeParam T - El tipo de la respuesta esperada. Define este tipo según los datos que retorna la API.
 */

const useHttp = <T>(endpoint: string, method: Method): HttpHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = 'http://localhost:4000/api/v1';

  const sendRequest = async (
    params: Record<string, any> = {},
    body: Record<string, any> | null = null,
    headers: Record<string, string> = {}
  ): Promise<void> => {
    setLoading(true);
    try {
      const options: AxiosRequestConfig = {
        method: method,
        url: `${BASE_URL}${endpoint}`,
        headers: headers,
        params: method === 'GET' ? params : {}, // Usar parámetros solo con GET
        data: method === 'POST' || method === 'PUT' ? body : null, // Usar cuerpo de solicitud con POST y PUT
      };

      if (method === 'DELETE') {
        options.params = params;
      }

      const response = await axios(options);
      setData(response.data as T);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, sendRequest };
};

export default useHttp;
