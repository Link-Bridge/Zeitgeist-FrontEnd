import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
import { statusChipColorCombination } from '../../../../colors';
import { Task } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import DeleteButton from '../../../common/DeleteButton';
import CancelButton from '../../../common/CancelButton';
import GenericDropdown from '../../../common/GenericDropdown';
import TaskActionsMenu from '../../../common/TaskActionsMenu';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted.bg,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss.bg,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision.bg,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed.bg,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postpone.bg,
  [TaskStatus.DONE]: statusChipColorCombination.done.bg,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled.bg,
};

interface TaskTableProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
}

const TaskTable = ({ tasks, onDelete }: TaskTableProps) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleDeleteButtonClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (taskToDelete) {
      await onDelete(taskToDelete.id);
      setDeleteDialogOpen(false);
    }
  };

  const dateToShortString = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Card sx={{ borderRadius: '12px', margin: '5px' }}>
        <TableContainer sx={{ padding: '0.5rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '40%' }}>
                  <Typography variant='body1' sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                    Task
                  </Typography>
                </TableCell>
                <TableCell style={{ width: '20%' }}>
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
                      <GenericDropdown
                        options={Object.values(TaskStatus)}
                        defaultValue={task.status}
                        onValueChange={() => {}}
                        colorMap={statusColorMap}
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
                      <TaskActionsMenu
                        task={task}
                        onEdit={() => handleClick(task.id)}
                        onOpenDeleteDialog={handleDeleteButtonClick}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>

        <DialogActions>
          <CancelButton onClick={() => setDeleteDialogOpen(false)}>Cancel</CancelButton>
          <DeleteButton onClick={handleDeleteConfirmed}>Delete</DeleteButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskTable;
