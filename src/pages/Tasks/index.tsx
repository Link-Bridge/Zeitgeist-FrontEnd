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

  useEffect(() => {
    if (userEmail) {
      userIdRequest();
    }
  }, []);

  const { data: tasksData, sendRequest: tasksRequest } = useHttp<{ data: Task[] }>(
    `/employee-task/${userData?.data.id}/tasks`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (userData?.data) {
      tasksRequest();
    }
  }, [userData]);

  useEffect(() => {
    if (tasksData) {
      setTasks(tasksData.data);
    }
  }, [tasksData]);

  // TODO: Implement the updateTaskStatus function
  const updateTaskStatus = (taskId: string, status: string) => {};

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
          {tasks && tasks.length > 0 ? (
            <TaskTable tasks={tasks} onUpdateStatus={updateTaskStatus} />
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
              <Typography variant='h2' align='center' gutterBottom>
                Your task list is empty
              </Typography>
              <Typography variant='body1' align='center' gutterBottom>
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
