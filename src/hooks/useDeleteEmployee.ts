import axios from 'axios';
import { useState } from 'react';

const useDeleteEmployee = () => {
  const [error, setError] = useState<Error | null>(null);

  const deleteEmployee = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/employees/${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { deleteEmployee, error };
};

export default useDeleteEmployee;
