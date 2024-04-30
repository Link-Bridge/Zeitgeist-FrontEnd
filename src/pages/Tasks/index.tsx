import { Box, Sheet, Typography } from '@mui/joy';
import { colors } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import TaskTable from '../../components/modules/Task/TableTask/TaskTable';
import { EmployeeContext } from '../../hooks/employeeContext';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { Task } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

/**
 * Shows the tasks assigned for the signed in employee
 *
 * @page
 * @returns JSX.Element - React component
 */
const Tasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;

  if (!employeeId) {
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
        <Typography variant='plain' level='h1'>
          No employee found
        </Typography>
        <Typography variant='plain' level='h2'>
          Please sign in to view your tasks
        </Typography>
      </Box>
    );
  }

  const {
    data: taskData,
    sendRequest: fetchTasks,
    error: taskError,
  } = useHttp<Response<Task>>(`/tasks/employee/${employeeId}`, RequestMethods.GET);

  const {
    data: projectData,
    sendRequest: fetchProjects,
    error: projectError,
  } = useHttp<Response<ProjectEntity>>(`/project/`, RequestMethods.GET);

  useEffect(() => {
    if (employeeId) fetchTasks();
  }, []);

  useEffect(() => {
    if (taskData) {
      fetchProjects();
    }
  }, [taskData]);

  useEffect(() => {
    if (taskData) {
      const tasksCache = taskData.data;
      setTasks(tasksCache);
    }
  }, [taskData]);

  const tasksPerProject = projectData?.data.map(project => {
    const projectTasks = tasks?.filter(task => task.idProject === project.id);

    return {
      project: project,
      tasks: projectTasks,
    };
  });

  // TODO: Update the task status
  const updateTaskStatus = async (taskId: string, status: string) => {
    console.log('Task status updated', taskId, status);
  };

  if (taskError || projectError) {
    return (
      <>
        <Typography level='h1' variant='plain'>
          Error
        </Typography>
        <Typography level='h2' variant='plain'>
          {taskError?.message || projectError?.message}
        </Typography>
      </>
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
          padding: 2,
          overflowY: 'auto',
        }}
      >
        {taskData && projectData ? (
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
                    fontSize: '1.5rem',
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
                      padding: 2,
                      borderRadius: 12,
                      backgroundColor: colors.grey[100],
                    }}
                  >
                    <TaskTable tasks={tasks || []} onUpdateStatus={updateTaskStatus} />
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
