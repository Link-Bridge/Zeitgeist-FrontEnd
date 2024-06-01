import { axiosInstance } from '../lib/axios/axios';
import { BASE_API_URL } from '../utils/constants';

/**
 * @description Deletes expense report
 * @param id
 * @returns deleteReport
 */

const useDeleteReport = () => {
  const deleteReport = async (id: string) => {
    await axiosInstance.delete(`${BASE_API_URL}/expense/report/delete/${id}`);
  };

  return { deleteReport };
};

export default useDeleteReport;
