/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusChipColorCombination } from '../../../../../colors';
import { ModalContext } from '../../../../../pages/Tasks/main';
import { Task } from '../../../../../types/task';
import { TaskStatus } from '../../../../../types/task-status';
import GenericDropdown from '../../../../common/GenericDropdown';
import TaskActionsMenu from '../../../../common/TaskActionsMenu';

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgress,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

type TaskRowProps = {
  task: Task;
  handleStatusChange: (id: string, newStatus: TaskStatus) => void;
};

function TaskRow({ task, handleStatusChange }: TaskRowProps) {
  const navigate = useNavigate();

  const modalContext = useContext(ModalContext);
  return (
    <tr className='hover:cursor-pointer' onClick={() => navigate(`/tasks/${task.id}`)}>
      <td>{task.title}</td>
      <td onClick={e => e.stopPropagation()}>
        <GenericDropdown
          onChange={newStatus => handleStatusChange(task.id, newStatus as TaskStatus)}
          options={Object.values(TaskStatus)}
          colorMap={statusColorMap}
          sx={{ width: '100%' }}
          value={task.status}
        />
      </td>
      <td>{task.workedHours ? task.workedHours : 0}</td>
      <td>{task.endDate ? dayjs.utc(task.endDate).format('DD/MM/YYYY') : 'No due date'}</td>
      <td onClick={e => e.stopPropagation()}>
        <TaskActionsMenu
          task={task}
          onEdit={() => navigate(`/tasks/edit/${task.id}`)}
          onOpenDeleteDialog={() => modalContext.setState({ open: true, taskId: task.id })}
        />
      </td>
    </tr>
  );
}

export default TaskRow;
