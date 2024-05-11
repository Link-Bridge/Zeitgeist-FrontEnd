import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewTaskForm from '../../components/modules/Task/NewTask/NewTaskForm';
import { SnackbarState } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { BareboneTask, TaskDetail } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

const NewTaskPage = () => {
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });

  const [initialTasks, setInitialTasks] = useState<TaskDetail[]>([]);
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
    try {
      await sendRequest({}, { ...payload });
    } catch (error: any) {
      setState({ open: true, message: `Error creating task: ${error}`, type: 'danger' });
    }
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
