import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

/**
 * Deletes a company by id
 *
 * @param id: string - Unique identifier of the company
 *
 * @returns deleteCompany
 */
const useDeleteCompany = () => {
  const [error, setError] = useState<Error | null>(null);

  const deleteCompany = async (id: string) => {
    try {
      await axiosInstance.delete(`${BASE_API_URL}/company/delete/${id}`);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { deleteCompany, error };
};

export default useDeleteCompany;
