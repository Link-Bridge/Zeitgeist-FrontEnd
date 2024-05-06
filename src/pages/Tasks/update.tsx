import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateTaskForm from '../../components/modules/Task/UpdateTask/UpdateTaskForm';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { Response } from '../../types/response';
import { TaskDetail, UpdatedTask } from '../../types/task';
import { APIPath, RequestMethods } from '../../utils/constants';

const UpdateTaskPage: React.FC = () => {
  const { id } = useParams();

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

  const { data: cachedTask, sendRequest: sendGetTaskRequest } = useHttp<TaskDetail>(
    `${APIPath.TASK_DETAIL}/${id}`,
    RequestMethods.GET
  );

  console.log(cachedTask);

  useEffect(() => {
    if (!cachedTask) {
      sendGetTaskRequest();
    }
  }, []);

  const { sendRequest: sendUpdateTaskRequest } = useHttp<UpdatedTask>(
    `${APIPath.UPDATE_TASK}/${id}`,
    RequestMethods.PUT
  );

  const handleOnSubmit = async (payload: UpdatedTask) => {
    try {
      await sendUpdateTaskRequest({}, { ...payload });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UpdateTaskForm
      data={cachedTask || ({} as TaskDetail)}
      onSubmit={handleOnSubmit}
      employees={employees || []}
    />
  );
};

export default UpdateTaskPage;
