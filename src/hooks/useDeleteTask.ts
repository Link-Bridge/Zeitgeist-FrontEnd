import axios from 'axios';
import { useState } from 'react';
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
      await axios.delete(`${BASE_API_URL}/tasks/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('idToken')}`,
        },
      });
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
