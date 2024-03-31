// Importamos useState y useEffect de React, necesarios para gestionar el estado
// del hook y efectuar efectos secundarios, respectivamente.
import { useState, useEffect } from 'react';

// Define un tipo genérico para el estado del hook, incluyendo los datos (data),
// si está cargando (isLoading) y cualquier error (error) que pueda ocurrir.
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
  // Estado para almacenar los datos de la respuesta. Inicialmente es null.
  const [data, setData] = useState<T | null>(null);
  // Estado para indicar si la solicitud está en curso. Inicialmente es true.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Estado para almacenar cualquier error que ocurra durante la solicitud. Inicialmente es null.
  const [error, setError] = useState<Error | null>(null);

  // useEffect se ejecuta al montar el componente y cada vez que la URL cambia.
  useEffect(() => {
    // Define una función asíncrona para realizar la solicitud fetch.
    const fetchData = async () => {
      setIsLoading(true); // Inicia la carga antes de hacer la solicitud.
      try {
        const response = await fetch(url); // Realiza la solicitud fetch.
        // Verifica si la respuesta es exitosa.
        if (!response.ok) {
          // Si la respuesta no es exitosa, lanza un error con el status de la respuesta.
          throw new Error(`Network response was not ok (${response.statusText})`);
        }
        const data: T = await response.json(); // Convierte la respuesta a JSON.
        setData(data); // Almacena los datos en el estado.
        setError(null); // Asegura que el estado de error esté limpio si la solicitud fue exitosa.
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud o su procesamiento.
        if (error instanceof Error) {
          // Si el error es una instancia de Error, lo almacena en el estado.
          setError(error);
        } else {
          // Si por alguna razón el error no es una instancia de Error, crea uno nuevo.
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setIsLoading(false); // Finaliza la carga independientemente del resultado.
      }
    };

    fetchData(); // Ejecuta la función fetchData.
  }, [url]); // Este efecto depende de la URL, se re-ejecuta si la URL cambia.

  // Retorna el estado del hook, incluyendo los datos, estado de carga y errores.
  return { data, isLoading, error };
};

// Hace el hook disponible para ser importado y utilizado en otros componentes.
export default useFetch;
