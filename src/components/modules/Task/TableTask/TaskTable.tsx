import { KeyboardArrowDownSharp, MoreHoriz } from '@mui/icons-material';
import { Card, CardContent, IconButton } from '@mui/joy';
import {
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
import { Task } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import GenericDropdown from '../../../common/GenericDropdown';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISSION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
};

// TODO:
// - Change the layout so that the card is the whole background,
//   and the tables are inside the card (separated by a margin)
// - Add project name and tasks associated with it to the table
// - Change text color according to the background in the generic dropdown
// - Add the ability to change the status of a task

interface TaskTableProps {
  projectName: string;
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

/**
 * Table task component for displaying task data in a Monday-like table
 *
 * @component
 * @param {TaskTableProps} props - The props for the component
 */
const TaskTable = ({ projectName, tasks, onUpdateStatus }: TaskTableProps) => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus | ''>('');

  const handleStatusSelect = (taskId: string, status: TaskStatus) => {
    onUpdateStatus(taskId, status);
  };

  return (
    <Card sx={{ borderRadius: '12px' }}>
      <CardContent>
        <Typography variant='h5'>{projectName}</Typography>
      </CardContent>

      <TableContainer>
        <Table>
          {/* Header  */}
          <TableHead>
            <TableRow>
              <TableCell
                style={{ width: '50%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Task
              </TableCell>
              <TableCell
                style={{ width: '15%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Status
              </TableCell>
              <TableCell
                style={{ width: '10%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Waiting For
              </TableCell>
              <TableCell
                style={{ width: '10%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Hours
              </TableCell>
              <TableCell
                style={{ width: '10%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Due Date
              </TableCell>
              <TableCell
                style={{ width: '10%' }}
                sx={{
                  color: colors.grey[700],
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                <KeyboardArrowDownSharp />
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Contents */}
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <GenericDropdown
                    options={Object.values(TaskStatus)}
                    onSelect={(status: TaskStatus) => handleStatusSelect(task.id, status)}
                    colorMap={statusColorMap}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.waitingFor}
                    style={{
                      backgroundColor: colors.grey[300],
                      color: colors.grey[900],
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={task.workedHours}
                    style={{
                      backgroundColor: '#D6CFBE',
                      color: colors.grey[700],
                    }}
                  />
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
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
