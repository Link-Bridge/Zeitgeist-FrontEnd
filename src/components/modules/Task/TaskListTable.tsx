import { Snackbar, Table } from '@mui/joy';
import { AxiosRequestConfig } from 'axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusChipColorCombination } from '../../../colors';
import { SnackbarContext, SnackbarState } from '../../../hooks/snackbarContext';
import { axiosInstance } from '../../../lib/axios/axios';
import { Task, TaskDetail } from '../../../types/task';
import { TaskStatus } from '../../../types/task-status';
import { APIPath, BASE_API_URL, RequestMethods } from '../../../utils/constants';
import { formatDate } from '../../../utils/methods';
import ComponentPlaceholder from '../../common/ComponentPlaceholder';
import DeleteModal from '../../common/DeleteModal';
import GenericDropdown from '../../common/GenericDropdown';
import Loader from '../../common/Loader';
import TaskActionsMenu from '../../common/TaskActionsMenu';

type TaskListTableProps = {
  initialTasks: TaskDetail[] | null;
  loadingTasks: boolean;
  errorTasks: Error | null;
  onDelete: (id: string) => void;
};

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgress,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

const TaskListTable = ({
  initialTasks,
  loadingTasks,
  errorTasks,
  onDelete,
}: TaskListTableProps) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newStatus, setNewStatus] = useState<TaskStatus | null>(null);
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const idTaskPayload = useRef<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleDeleteButtonClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleStatusChange = async (idTask: string, status: TaskStatus | null) => {
    setNewStatus(status);

    if (idTask.trim() !== '') {
      idTaskPayload.current = idTask;

      const payload = {
        status: status as TaskStatus,
      };

      try {
        await doFetch(payload);
        setState({ open: true, message: 'Task status updated successfully.', type: 'success' });
        setTimeout(() => {
          setState({ open: false, message: '' });
        }, 2000);
      } catch (error) {
        setState({ open: true, message: 'Failed to update status task.', type: 'danger' });
        console.error(error);
      }
    } else {
      console.error('Empty idTask received.');
    }
  };

  const doFetch = async (payload: { status: TaskStatus }) => {
    const options: AxiosRequestConfig = {
      method: RequestMethods.PUT,
      url: `${BASE_API_URL}${APIPath.UPDATE_TASK_STATUS}/${idTaskPayload.current}`,
      data: payload,
    };
    await axiosInstance(options);
  };

  if (loadingTasks) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (errorTasks) {
    return <div>Error: {errorTasks.message}</div>;
  }

  if (!initialTasks || initialTasks.length === 0) {
    return (
      <ComponentPlaceholder
        text='No tasks associated to this project were found.'
        width='20vh'
        height='15vh'
      />
    );
  }

  /**
   * Task List Table component
   *
   * @component
   * @param {ClientDetailProps} props - Page props
   * @param {string} props.projectId - The id of the desired project
   *
   * @returns {JSX.Element} Client details page
   */

  return (
    <Table>
      {initialTasks && initialTasks.length !== 0 && (
        <>
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Task</th>
              <th>Status</th>
              <th style={{ width: '15%' }}>Due Date</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {initialTasks.map(task => (
              <tr key={task.id}>
                <td className='hover:cursor-pointer' onClick={() => handleClick(task.id)}>
                  {task.title}
                </td>
                <td>
                  <GenericDropdown
                    options={Object.values(TaskStatus)}
                    onChange={value => handleStatusChange(task.id, value as TaskStatus)}
                    defaultValue={task.status as TaskStatus}
                    colorMap={statusColorMap}
                    placeholder='Select status ...'
                  />
                </td>
                <td>{task.endDate ? formatDate(task.endDate) : 'No due date'}</td>
                <td>
                  <TaskActionsMenu
                    task={task as Task}
                    onEdit={handleEdit}
                    onOpenDeleteDialog={handleDeleteButtonClick}
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <DeleteModal
            open={taskToDelete !== null}
            setOpen={() => setTaskToDelete(null)}
            title='Confirm Deletion'
            description='Are you sure you want to delete this task?'
            id={taskToDelete?.id || ''}
            handleDeleteEmployee={(id: string) => {
              onDelete(id);
              setTaskToDelete(null);
            }}
          />
        </>
      )}
      {/* Snackbar */}
      <SnackbarContext.Provider value={{ state, setState }}>
        <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
          {state.message}
        </Snackbar>
      </SnackbarContext.Provider>
    </Table>
  );
};

export { TaskListTable };
