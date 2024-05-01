import { KeyboardArrowDown, MoreHoriz } from '@mui/icons-material';
import {
  Card,
  Chip,
  IconButton,
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
import { Task } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISSION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
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
  const [collapsed, setCollapsed] = useState(false);

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
    <Card sx={{ borderRadius: '12px', margin: '10px' }}>
      <TableContainer sx={{ padding: '1rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '50%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Task
                </Typography>
              </TableCell>
              <TableCell style={{ width: '15%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Hours
                </Typography>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <Typography variant='body1' sx={{ fontWeight: 600 }}>
                  Due Date
                </Typography>
              </TableCell>
              <TableCell style={{ width: '10%' }}>
                <Typography
                  variant='body1'
                  sx={{ fontWeight: 600, cursor: 'pointer' }}
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
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
                    {/* <GenericDropdown
                      options={Object.values(TaskStatus)}
                      onSelect={(status: TaskStatus) => handleStatusSelect(task.id, status)}
                      colorMap={statusColorMap}
                    /> */}
                    <Chip
                      label={task.status}
                      sx={{ backgroundColor: statusColorMap[task.status], color: colors.grey[800] }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={String(task.workedHours)}
                      sx={{ backgroundColor: '#D6CFBE', color: colors.grey[700] }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      color: '#fff',
                    }}
                  >
                    {dateToShortString(String(task.endDate))}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label='more'>
                      <MoreHoriz />
                    </IconButton>
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
