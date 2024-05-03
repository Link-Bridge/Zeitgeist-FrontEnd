import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewTaskForm from '../../components/modules/Task/NewTask/NewTaskForm';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { Response } from '../../types/response';
import { BareboneTask } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

const NewTaskPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
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

  const { sendRequest } = useHttp<BareboneTask>('/tasks/create', RequestMethods.POST);

  const handleOnSubmit = async (payload: BareboneTask) => {
    await sendRequest({}, { ...payload });
  };

  return (
    <NewTaskForm
      onSubmit={handleOnSubmit}
      employees={employees || []}
      projectId={projectId ? projectId : ''}
    />
  );
};

export default NewTaskPage;
