import { AccordionGroup, Sheet } from '@mui/joy';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import DeleteModal from '../../components/common/DeleteModal';
import ErrorView from '../../components/common/Error';
import Loader from '../../components/common/Loader';
import TaskTable from '../../components/modules/Task/NewTask/TableTask/TaskTable';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import { axiosInstance } from '../../lib/axios/axios';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { Task } from '../../types/task';
import { TaskStatus } from '../../types/task-status';
import { BASE_API_URL, RequestMethods } from '../../utils/constants';

type ModalState = {
  taskId: string;
  open: boolean;
};

type ModalStateContext = {
  state: ModalState;
  setState: (state: ModalState) => void;
};

export const ModalContext = createContext<ModalStateContext>({
  state: { open: false, taskId: '' },
  setState: () => {},
});

/**
 * Shows the tasks assigned for the signed in employee in a table format,
 * grouped by project and sorted by status and due date.
 *
 * @page
 *
 * @return {JSX.Element} - React component when the information is loading
 * @return {JSX.Element} - React component when an error occurs
 * @return {JSX.Element} - React component when the information is loaded
 */
const AssignedTasks = (): JSX.Element => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setState } = useContext(SnackbarContext);
  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;
  const [modalState, setModalState] = useState<ModalState>({ open: false, taskId: '' });

  const {
    data: taskData,
    sendRequest: fetchTasks,
    error: taskError,
    loading: taskLoading,
  } = useHttp<Task[]>(`/tasks/employee/${employeeId}`, RequestMethods.GET);

  const {
    data: projectData,
    sendRequest: fetchProjects,
    error: projectError,
    loading: projectLoading,
  } = useHttp<Response<ProjectEntity>>(`/project/`, RequestMethods.GET);

  async function handleStatusChange(id: string, newStatus: TaskStatus) {
    try {
      await axiosInstance.put(`${BASE_API_URL}/tasks/update/status/${id}`, {
        status: newStatus,
      });
      const task = tasks.find(task => task.id === id)!;
      task.status = newStatus;
      if (newStatus === 'Done') task.endDate = dayjs().startOf('day').toDate();
      setTasks(tasks);
      setState({ message: 'Task status updated successfully', open: true, type: 'success' });
    } catch {
      setState({ message: 'Error updating task status', open: true, type: 'danger' });
    }
  }

  useEffect(() => {
    if (employeeId) fetchTasks();
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  useEffect(() => {
    if (taskData) setTasks(taskData);
  }, [taskData]);

  const filterTasksByProjectId = (tasks: Task[], projectId: string): Task[] =>
    tasks.filter(task => task.idProject === projectId);

  const sortTasks = (tasks: Task[]): Task[] =>
    tasks.sort((a, b) => {
      if (a.status === 'Done' && b.status !== 'Done') return 1;
      if (a.status !== 'Done' && b.status === 'Done') return -1;
      if (a.status === b.status) return a.status === 'Done' ? 1 : -1;
      if (!a.endDate || !b.endDate) return 0;

      const dateA = new Date(a.endDate);
      const dateB = new Date(b.endDate);

      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
      return dateA.getTime() - dateB.getTime();
    });

  const tasksPerProject: { project: ProjectEntity; tasks: Task[] }[] = (projectData?.data ?? [])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(project => {
      const projectTasks = filterTasksByProjectId(tasks, project.id);
      const sortedTasks = sortTasks(projectTasks);

      return { project, tasks: sortedTasks };
    })
    .filter(({ tasks }) => tasks.length > 0);

  async function deleteTask() {
    try {
      await axiosInstance.delete(`${BASE_API_URL}/tasks/delete/${modalState.taskId}`);
      setTasks(tasks.filter(task => task.id !== modalState.taskId));
      setState({ message: 'Task deleted successfully', open: true, type: 'success' });
    } catch (error: unknown) {
      console.error(error);
      setState({ message: 'Error deleting task', open: true, type: 'danger' });
    }
  }

  if (taskError || projectError) {
    if (taskError instanceof AxiosError && taskError.response?.status === 403) {
      navigate('/');
    }

    if (projectError instanceof AxiosError && projectError.response?.status === 403) {
      navigate('/');
    }

    return <ErrorView error={'An unexpected error occurred. Please try again later.'} />;
  }

  if (taskLoading || (projectLoading && !tasksPerProject)) {
    return <Loader />;
  }

  if (!tasksPerProject || tasksPerProject.length === 0 || !taskData || !projectData) {
    return <ComponentPlaceholder text='No tasks were found' />;
  }

  return (
    <ModalContext.Provider value={{ state: modalState, setState: setModalState }}>
      <Sheet sx={{ borderRadius: '0.6rem', overflowY: 'auto' }}>
        <AccordionGroup size='lg' disableDivider>
          {tasksPerProject.map(project => (
            <TaskTable
              projectName={project.project.name}
              tasks={project.tasks}
              key={project.project.id}
              handleStatusChange={handleStatusChange}
            />
          ))}
        </AccordionGroup>

        <DeleteModal
          open={modalState.open}
          title='Confirm Deletion'
          description='Are you sure you want to delete this task?'
          id={''}
          setOpen={() => setModalState({ taskId: '', open: false })}
          handleDelete={deleteTask}
        />
      </Sheet>
    </ModalContext.Provider>
  );
};

export default AssignedTasks;
