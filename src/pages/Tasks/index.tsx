import { Sheet, Typography } from '@mui/joy';
import { colors } from '@mui/material';
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import TaskTable from '../../components/modules/Task/TableTask/TaskTable';
import useHttp from '../../hooks/useHttp';
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
  const [tasks, setTasks] = useState<Task[] | null>([]);

  // TODO:
  // - Fetch the signed in user ID. Since the user is already signed in,
  //   the ID must be fetched from the backend using the ID token
  // - Fetch the tasks assigned to the user using the user ID
  // - Update the tasks state with the fetched tasks
  let userEmail = sessionStorage.getItem('userEmail');

  const { data: userData, sendRequest: userIdRequest } = useHttp<User>(
    `/employee/${userEmail}`,
    RequestMethods.GET
  );

  // TODO: Stop the infinite fetch loop
  useEffect(() => {
    userIdRequest();
  }, []);

  console.log(userData);

  // TODO: Implement the updateTaskStatus function
  const updateTaskStatus = (taskId: string, status: string) => {};

  return (
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
      <Typography
        variant='h1'
        sx={{ fontWeight: 600, fontSize: '1.4rem', color: colors.grey[800] }}
      >
        {firstProject}
      </Typography>
      <TaskTable tasks={tasks || []} onUpdateStatus={updateTaskStatus} />
    </Sheet>
  );
};

export default Tasks;
