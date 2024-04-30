import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import UpdateTaskForm from '../../components/modules/Task/UpdateTask/UpdateTaskForm';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { Response } from '../../types/response';
import { UpdatedTask } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

const UpdateTaskPage: React.FC = () => {
  const { data: cachedEmployees, sendRequest: sendEmployeeRequest } = useHttp<
    Response<EmployeeEntity>
  >(`/employee/getAllEmployees`, RequestMethods.GET);

  const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
  useEffect(() => {
    sendEmployeeRequest();
  }, []);

  useEffect(() => {
    if (cachedEmployees) {
      setEmployees(cachedEmployees.data);
    }
  }, [cachedEmployees]);

  // const { idTask } = useParams();
  const { sendRequest } = useHttp<UpdatedTask>(`/tasks/update/445564de-0f44-4634-afc1-40190242792c`, RequestMethods.PUT);

  const handleOnSubmit = async (payload: UpdatedTask) => {
    await sendRequest({}, { ...payload });
  };

  return <UpdateTaskForm onSubmit={handleOnSubmit} employees={employees || []} />;
};

export default UpdateTaskPage;
