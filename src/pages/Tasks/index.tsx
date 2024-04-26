import { Sheet, Typography } from '@mui/joy';
import { colors } from '@mui/material';
import { useState } from 'react';
import TaskTable from '../../components/modules/Task/TableTask/TaskTable';
import { Task } from '../../types/task';
import { TaskStatus } from '../../types/task-status';

const Tasks = () => {
  const firstProject = 'CIE Renovation';

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Update of personal and professional information',
      description: 'Description 1',
      status: TaskStatus.NOT_STARTED,
      waitingFor: 'Sebastián',
      startDate: '2022-01-01',
      dueDate: '14-02-2024',
      workedHours: '65',
      idProject: '1',
    },
    {
      id: '2',
      title: 'Collection of necessary documentation',
      description: 'Description 2',
      status: TaskStatus.DONE,
      waitingFor: 'Sebastián',
      startDate: '2022-01-01',
      dueDate: '15-02-2024',
      workedHours: '65',
      idProject: '1',
    },
    {
      id: '3',
      title: 'Scheduling an appointment at the embassy',
      description: 'Description 2',
      status: TaskStatus.DONE,
      waitingFor: 'Sebastián',
      startDate: '2022-01-01',
      dueDate: '16-02-2024',
      workedHours: '65',
      idProject: '1',
    },
    {
      id: '4',
      title: 'Financial preparation',
      description: 'Description 2',
      status: TaskStatus.DONE,
      waitingFor: 'Sebastián',
      startDate: '2022-01-01',
      dueDate: '17-02-2024',
      workedHours: '65',
      idProject: '1',
    },
  ]);

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    // TODO: If the status is changed, POST request to the backend

    // Update the status in local state
    setTasks(prevTasks => prevTasks.map(task => (task.id === taskId ? { ...task, status } : task)));
  };

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
      <TaskTable tasks={tasks} onUpdateStatus={updateTaskStatus} />
    </Sheet>
  );
};

export default Tasks;
