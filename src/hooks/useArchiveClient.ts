import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

const useDeleteEmployee = () => {
  const [error, setError] = useState<Error | null>(null);

  const archiveClient = async (id: string) => {
    try {
      await axiosInstance.put(`${BASE_API_URL}/admin/archive/${id}`, {});
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { archiveClient, error };
};

export default useDeleteEmployee;
