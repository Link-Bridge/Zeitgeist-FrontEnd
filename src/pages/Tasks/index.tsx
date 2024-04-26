import { Sheet, Typography } from '@mui/joy';
import { Box, colors } from '@mui/material';
import { useEffect, useState } from 'react';
import TaskTable from '../../components/modules/Task/TableTask/TaskTable';
import useHttp from '../../hooks/useHttp';
import { EmployeeEntity } from '../../types/employee';
import { Task } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

/**
 * Shows the tasks assigned for the signed in employee
 *
 * @page
 * @returns JSX.Element - React component
 */
const Tasks = () => {
  const firstProject = 'CIE Renovation';
  const userEmail = sessionStorage.getItem('userEmail');
  const [tasks, setTasks] = useState<Task[] | null>([]);

  const { data: userData, sendRequest: userIdRequest } = useHttp<{ data: EmployeeEntity }>(
    `/employee/${userEmail}`,
    RequestMethods.GET
  );

  const userId = userData?.data.id;

  const {
    data: tasksData,
    sendRequest: tasksRequest,
    error,
  } = useHttp<Task[]>(`/employee-task/${userId}/tasks`, RequestMethods.GET);

  useEffect(() => {
    if (userEmail) {
      userIdRequest();
    }
  }, []);

  useEffect(() => {
    if (userId) {
      tasksRequest();
    }
  }, [userId]);

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData);
    }
  }, [tasksData]);

  // TODO: Implement the updateTaskStatus function
  const updateTaskStatus = (taskId: string, status: string) => {
    console.log(taskId, status);
  };

  if (error)
    return (
      <>
        <Typography level='h1' variant='plain'>
          Error
        </Typography>
        <Typography level='h4' variant='plain'>
          {error.message}
        </Typography>
      </>
    );

  return (
    <>
      {userData && (
        <Sheet
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 12,
            padding: 2,
            maxHeight: '100vh',
            overflowY: 'auto',
          }}
        >
          {tasks ? (
            <>
              <Typography
                variant='plain'
                level='h1'
                sx={{
                  color: colors.grey[800],
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                }}
              >
                {firstProject}
              </Typography>
              <TaskTable tasks={tasks} onUpdateStatus={updateTaskStatus} />
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
              <Typography variant='plain' level='h4'>
                Get started by adding tasks to visualize your project.
              </Typography>
            </Box>
          )}
        </Sheet>
      )}
    </>
  );
};

export default Tasks;
