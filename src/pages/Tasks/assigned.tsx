import { Box, Sheet, Typography } from '@mui/joy';
import { colors } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ErrorView from '../../components/common/Error';
import Loader from '../../components/common/Loader';
import TaskTable from '../../components/modules/Task/TableTask/TaskTable';
import { EmployeeContext } from '../../hooks/employeeContext';
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
const Tasks = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;

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
    } catch (error) {
      console.error(error);
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

  const sortTasksByEndDate = (tasks: Task[]): Task[] =>
    tasks.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());

  const tasksPerProject: { project: ProjectEntity; tasks: Task[] }[] = (projectData?.data ?? [])
    .map(project => {
      const projectTasks = filterTasksByProjectId(tasks, project.id);
      const sortedTasks = sortTasksByEndDate(projectTasks);

      return { project, tasks: sortedTasks };
    })
    .filter(({ tasks }) => tasks.length > 0);

  if (taskError || projectError) {
    return <ErrorView error={taskError || projectError} />;
  }

  if (taskLoading || projectLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: colors.grey[500],
        }}
      >
        <Typography variant='plain' level='h1' mb={4}>
          Loading tasks
        </Typography>

        <Loader />
      </Box>
    );
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
          overflowY: 'auto',
        }}
      >
        {taskData && projectData && tasksPerProject.length ? (
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
                  backgroundColor: colors.grey[50],
                }}
              >
                <Typography
                  level='h1'
                  variant='plain'
                  sx={{
                    color: colors.grey[800],
                    fontWeight: 'bold',
                    fontSize: '1rem',
                  }}
                >
                  {project.name}
                </Typography>

                {tasks?.length && tasks.length > 0 && (
                  <Box
                    key={tasks[0].id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      padding: 0.5,
                      borderRadius: 12,
                      backgroundColor: colors.grey[100],
                    }}
                  >
                    <TaskTable tasks={tasks || []} onDelete={handleDeleteTask} />
                  </Box>
                )}
              </Box>
            ))}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: colors.grey[500],
            }}
          >
            <Typography variant='plain' level='h1'>
              Your task list is empty
            </Typography>
            <Typography variant='plain' level='h2'>
              Get started by adding tasks to your project
            </Typography>
          </Box>
        )}
      </Sheet>
    </>
  );
};

export default Tasks;
