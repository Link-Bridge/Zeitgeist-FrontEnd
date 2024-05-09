import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Box, Snackbar, Table } from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { statusChipColorCombination } from '../../../colors';
import { SnackbarContext, SnackbarState } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { Response } from '../../../types/response';
import { Task, TaskDetail } from '../../../types/task';
import { TaskStatus } from '../../../types/task-status';
import { APIPath, RequestMethods } from '../../../utils/constants';
import { formatDate } from '../../../utils/methods';
import DeleteModal from '../../common/DeleteModal';
import GenericDropdown from '../../common/GenericDropdown';
import TaskActionsMenu from '../../common/TaskActionsMenu';

type TaskListTableProps = {
  projectId: string;
  onDelete: (id: string) => void;
  setTotalProjectHours: (update: (prev: number) => number) => void;
};

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

const TaskListTable = ({ projectId, onDelete, setTotalProjectHours }: TaskListTableProps) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskDetail[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newStatus, setNewStatus] = useState<TaskStatus | null>(null);
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const idTaskPayload = useRef<string>('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const { data, error, loading, sendRequest } = useHttp<Response<TaskDetail>>(
    `/tasks/project/${projectId}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (!data) sendRequest();
    if (data && data.data) {
      const tasks = data.data;
      setTasks(tasks);

      setTotalProjectHours(() =>
        tasks.reduce((totalHours, task) => totalHours + (task.workedHours || 0), 0)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClick = (id: string) => {
    navigate(`/tasks/${id}`);
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
    const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;
    const idToken = localStorage.getItem('idToken');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    };
    const options: AxiosRequestConfig = {
      method: RequestMethods.PUT,
      url: `${BASE_URL}${APIPath.UPDATE_TASK_STATUS}/${idTaskPayload.current}`,
      headers: headers,
      data: payload,
    };
    await axios(options);
  };

  // const { sendRequest: sendUpdateStatusTaskRequest } = useHttp<TaskDetail>(
  //   `${APIPath.UPDATE_TASK_STATUS}/${idTaskPayload.current}`,
  //   RequestMethods.PUT
  // );

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
    <Table borderAxis='none'>
      {data?.data.length === 0 && (
        <tbody>
          <tr>
            <td className='w-full flex flex-col items-center justify-center'>
              <WarningAmberIcon style={{ color: '#C29A51', width: '40px', height: '40px' }} />
            </td>
          </tr>
          <tr>
            <td className='w-full flex flex-col items-center justify-center'>
              <Box className='mt-4'>No tasks associated to this company were found.</Box>
            </td>
          </tr>
        </tbody>
      )}
      {data && data.data && data.data.length !== 0 && (
        <>
          <thead>
            <tr>
              <th style={{ width: '40%' }}> Task </th>
              <th>Status</th>
              <th style={{ width: '15%' }}>Due Date</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td className='hover:cursor-pointer' onClick={() => handleClick(task.id)}>
                  {task.title}
                </td>
                <td>
                  <GenericDropdown
                    options={Object.values(TaskStatus)}
                    onValueChange={value => handleStatusChange(task.id, value)}
                    defaultValue={task.status as TaskStatus}
                    colorMap={statusColorMap}
                    placeholder='Select status ...'
                  />
                  {/* <ClickableChip value={formatStatus(task.status)} setValue={() => {}} /> */}
                </td>
                <td>{formatDate(task.endDate ? task.endDate : null)}</td>
                <td>
                  <TaskActionsMenu
                    task={task as Task}
                    onEdit={() => handleClick(task.id)}
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
