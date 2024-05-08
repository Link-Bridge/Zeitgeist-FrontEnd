import { Table } from '@mui/joy';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../../hooks/useHttp';
import { Response } from '../../../types/response';
import { Task, TaskDetail } from '../../../types/task';
import { RequestMethods } from '../../../utils/constants';
import { formatDate } from '../../../utils/methods';
import ComponentPlaceholder from '../../common/ComponentPlaceholder';
import DeleteModal from '../../common/DeleteModal';
import ClickableChip from '../../common/DropDown';
import TaskActionsMenu from '../../common/TaskActionsMenu';

type TaskListTableProps = {
  projectId: string;
  onDelete: (id: string) => void;
  setTotalProjectHours: (update: (prev: number) => number) => void;
};

const TaskListTable = ({ projectId, onDelete, setTotalProjectHours }: TaskListTableProps) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskDetail[]>([]);

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

  const formatStatus = (status: string): string => {
    const words = status.split(' ');
    const camelCaseWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return camelCaseWords.join(' ');
  };

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
    <Table>
      {data?.data.length === 0 && (
        <div className='w-full flex flex-col items-center justify-center my-20'>
          <ComponentPlaceholder text='No tasks associated to this company were found.' />
        </div>
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
                  <ClickableChip value={formatStatus(task.status)} setValue={() => {}} />
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
    </Table>
  );
};

export { TaskListTable };
