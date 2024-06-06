import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

const useDeleteEmployee = () => {
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const deleteEmployee = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`${BASE_API_URL}/employee/delete/${id}`);
      if (res.status == 200) setSuccess(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { deleteEmployee, error, success };
};

export default useDeleteEmployee;
