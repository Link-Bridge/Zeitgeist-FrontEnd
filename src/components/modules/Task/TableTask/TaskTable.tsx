import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  colors,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import TaskActionsMenu from '../../../common/TaskActionsMenu';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
  [TaskStatus.SELECT_OPTION]: '#D6CFBE',
};

interface TaskTableProps {
  tasks: Task[];
}

/**
 * Table component to display the tasks assigned to the employee
 *
 * @param tasks: Task[] - List of tasks assigned to the employee
 * @param onUpdateStatus: (taskId: string, status: TaskStatus) => void -
 *                         Function to update the status of the task
 * @returns JSX.Element - React component
 */
const TaskTable = ({ tasks }: TaskTableProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const dateToShortString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Card sx={{ borderRadius: '12px', margin: '5px' }}>
      <TableContainer sx={{ padding: '0.5rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  Task
                </Typography>
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  Hours
                </Typography>
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <Typography
                  variant='body1'
                  sx={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}
                  onClick={handleCollapseToggle}
                >
                  <KeyboardArrowDown />
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!collapsed &&
              tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell onClick={() => handleClick(task.id)} sx={{ cursor: 'pointer' }}>
                    {task.title}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      sx={{
                        backgroundColor: statusColorMap[task.status],
                        color: colors.grey[800],
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.workedHours ?? 0}
                      sx={{ backgroundColor: '#D6CFBE', color: colors.grey[700] }}
                    />
                  </TableCell>
                  <TableCell>{dateToShortString(String(task.endDate))}</TableCell>
                  <TableCell>
                    <TaskActionsMenu taskId={task.id} onEdit={() => {}} onDelete={() => {}} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TaskTable;
