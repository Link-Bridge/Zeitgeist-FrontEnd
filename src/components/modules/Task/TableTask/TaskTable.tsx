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

interface TaskTableProps {
  tasks: Task[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
}

const TaskTable = ({ tasks, onUpdateStatus }: TaskTableProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleStatusSelect = (taskId: string, status: TaskStatus) => {
    onUpdateStatus(taskId, status);
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
                  Waiting For
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
                    <GenericDropdown
                      options={Object.values(TaskStatus)}
                      onSelect={(status: TaskStatus) => handleStatusSelect(task.id, status)}
                      colorMap={statusColorMap}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.waitingFor}
                      sx={{ backgroundColor: colors.grey[300], color: colors.grey[900] }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.workedHours}
                      sx={{ backgroundColor: '#D6CFBE', color: colors.grey[700] }}
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
