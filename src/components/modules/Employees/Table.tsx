import useFetch from '../../../hooks/useFetch';
import { EnvKeysValues } from '../../../utils/constants';

// Definiendo un tipo para los datos que esperas de la API
type UserData = {
  id: number;
  name: string;
  // otros campos...
};

const EmployeeDummyComponent = () => {
  const { data, isLoading, error } = useFetch<UserData>(`${EnvKeysValues.BASE_API_URL}/employee`); // Hacer la solicitud a la API con el hook useFetch

  if (isLoading) return <p>Loading...</p>; // Muestra un mensaje de carga mientras se obtienen los datos
  if (error) return <p>Error: {error.message}</p>; // Muestra un mensaje de error si ocurre un error

  return (
    <div>
      {/* Muestra el nombre del empleado si hay datos */}
      {data && <div>{data.name}</div>}
    </div>
  );
};

export default EmployeeDummyComponent;
