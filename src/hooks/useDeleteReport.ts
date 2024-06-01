import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

/**
 * @description Deletes expense report
 * @param id
 * @returns deleteReport
 */

const useDeleteReport = () => {
  const [error, setError] = useState<Error | null>(null);

  const deleteReport = async (id: string) => {
    try {
      await axiosInstance.delete(`${BASE_API_URL}/expense/report/delete/${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { deleteReport, error };
};

export default useDeleteReport;
