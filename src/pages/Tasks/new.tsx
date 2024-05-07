import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewTaskForm from '../../components/modules/Task/NewTask/NewTaskForm';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { BareboneTask } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

const NewTaskPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: cachedEmployees, sendRequest: sendEmployeeRequest } = useHttp<
    Response<EmployeeEntity>
  >(`/employee/getAllEmployees`, RequestMethods.GET);

  const [employees, setEmployees] = useState<EmployeeEntity[]>([]);
  const { sendRequest: requestProject, data: projectData } = useHttp<ProjectEntity>(
    `/project/details/${projectId}`,
    RequestMethods.GET
  );

  useEffect(() => {
    sendEmployeeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cachedEmployees) {
      setEmployees(cachedEmployees.data);
    }
  }, [cachedEmployees]);

  useEffect(() => {
    requestProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectName = projectData?.name;
  const { sendRequest } = useHttp<BareboneTask>('/tasks/create', RequestMethods.POST);

  const handleOnSubmit = async (payload: BareboneTask) => {
    await sendRequest({}, { ...payload });
  };

  return (
    <NewTaskForm
      onSubmit={handleOnSubmit}
      employees={employees || []}
      projectId={projectId ? projectId : ''}
      projectName={projectName ? projectName : ''}
    />
  );
};

export default NewTaskPage;
