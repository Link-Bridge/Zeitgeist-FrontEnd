import { Table } from '@mui/joy';

import CircularProgress from '@mui/joy/CircularProgress';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useEffect, useState } from 'react';
import useHttp from '../../../hooks/useHttp';
import { Response } from '../../../types/response';
import { TaskDetail } from '../../../types/task';
import { RequestMethods } from '../../../utils/constants';
import ClickableChip from '../../common/DropDown';

import WarningAmberIcon from '@mui/icons-material/WarningAmber';

type TaskListTableProps = {
  projectId: string;
};

const TaskListTable = ({ projectId }: TaskListTableProps) => {
  const [tasks, setTasks] = useState<TaskDetail[]>([]);

  const formatDate = (date: Date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(options);
    return formattedDate;
  };

  const formatStatus = (status: string): string => {
    const words = status.split(' ');
    const camelCaseWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return camelCaseWords.join(' ');
  };

  const { data, error, loading, sendRequest } = useHttp<Response<TaskDetail[]>>(
    `/tasks/project/${projectId}`,
    RequestMethods.GET
  );

  useEffect(() => {
    sendRequest();
  }, []);

  useEffect(() => {
    if (data && data.data) {
      setTasks(data.data);
    }
  }, [data]);

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
          <WarningAmberIcon style={{ color: '#C29A51', width: '40px', height: '40px' }} />
          <p className='mt-4'>No tasks associated to this company were found.</p>
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
                <td>{task.title}</td>
                <td>
                  <ClickableChip value={formatStatus(task.status)} setValue={() => {}} />
                </td>
                <td>{formatDate(task.endDate)}</td>
                <td>
                  <MoreHorizIcon style={{ color: '#636B74' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </Table>
  );
};

export { TaskListTable };
