
import useFetch from '../../../hooks/useFetch';

// Definiendo un tipo para los datos que esperas de la API
type UserData = {
  id: number;
  name: string;
  // otros campos...
};

const EmployeeComponent = () => {
  const { data, isLoading, error } = useFetch<UserData>('https://api.example.com/employee');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data && <div>{data.name}</div>}
    </div>
  );
};

export default EmployeeComponent;
