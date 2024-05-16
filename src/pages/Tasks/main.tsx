import { Box, Sheet, Typography } from '@mui/joy';
import { AxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../../colors';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import ErrorView from '../../components/common/Error';
import Loader from '../../components/common/Loader';
import TaskTable from '../../components/modules/Task/NewTask/TableTask/TaskTable';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useDeleteTask from '../../hooks/useDeleteTask';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { Task } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setState } = useContext(SnackbarContext);
  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;
  const navigate = useNavigate();

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

  const deleteTask = useDeleteTask();
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.deleteTask(taskId);
      fetchTasks();

      setState({
        open: true,
        message: 'Task deleted successfully.',
        type: 'success',
      });
    } catch (error) {
      setState({
        open: true,
        message: 'An error occurred while deleting the task.',
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (employeeId) fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  useEffect(() => {
    if (taskData) setTasks(taskData);
  }, [taskData]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.gray,
        }}
      >
        <Typography variant='plain' level='h1' mb={4}>
          Loading tasks
        </Typography>

        <Loader />
      </Box>
    );
  }

  if (!tasksPerProject || tasksPerProject.length === 0 || !taskData || !projectData) {
    return <ComponentPlaceholder text='No tasks were found' />;
  }

  return (
    <>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 12,
          padding: 0.5,
          overflow: 'auto',
        }}
      >
        {taskData && projectData && tasksPerProject.length && (
          <>
            {tasksPerProject?.map(({ project, tasks }) => (
              <Box
                key={project.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: 2,
                  borderRadius: 12,
                  backgroundColor: colors.white,
                }}
              >
                <Typography
                  level='h1'
                  variant='plain'
                  sx={{
                    color: colors.gray,
                    fontWeight: 'bold',
                    fontSize: '1.4rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {project.name}
                </Typography>

                {tasks?.length && tasks.length > 0 && (
                  <div className='rounded-lg border-2' style={{ borderColor: colors.lighterGray }}>
                    <TaskTable tasks={tasks || []} onDelete={handleDeleteTask} />
                  </div>
                )}
              </Box>
            ))}
          </>
        )}
      </Sheet>
    </>
  );
};

export default AssignedTasks;
