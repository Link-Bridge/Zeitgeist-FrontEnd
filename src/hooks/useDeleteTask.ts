import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

/**
 * Deletes a task from the database
 *
 * @return { deleteTask, error }
 */
const useDeleteTask = () => {
  const [error, setError] = useState<Error | null>(null);

  /**
   * Deletes a task by id
   *
   * @param id: string - Unique identifier of the task
   */
  const deleteTask = async (id: string) => {
    try {
      await axiosInstance.delete(`${BASE_API_URL}/tasks/delete/${id}`);
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data.message || err.message));
      } else {
        setError(new Error('Unknown error occurred'));
      }
    }
  };

  return { deleteTask, error };
};

export default useDeleteTask;
