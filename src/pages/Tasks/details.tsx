import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Chip, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Divider from '@mui/material/Divider';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import calendar from '../../assets/icons/black_calendar.svg';
import trash_can from '../../assets/icons/trash_can.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import DeleteModal from '../../components/common/DeleteModal';
import GoBack from '../../components/common/GoBack';
import Loader from '../../components/common/Loader';
import StatusChip from '../../components/common/StatusChip';
import useDeleteTask from '../../hooks/useDeleteTask';
import useHttp from '../../hooks/useHttp';
import { TaskDetail } from '../../types/task';
import { APIPath, RequestMethods } from '../../utils/constants';
import Update from './edit';

function capitalize(data: string): string {
  return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
}

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}/${month}/${year}`;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const { data, loading, sendRequest, error } = useHttp<TaskDetail>(
    `${APIPath.TASK_DETAIL}/${id}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('Invalid uuid') || message.includes('unexpected error')) {
        setNotFound(true);
      }
    }
  }, [error]);

  const handleClick = () => {
    navigate('/tasks');
  };

  const [showUpdate, setShowUpdate] = useState(false);

  const handleEdit = () => {
    setShowUpdate(true);
    navigate(`/tasks/edit/${id}`, { state: { fromDetails: true } });
  };

  const deleteTask = useDeleteTask();
  const onDelete = async (taskId: string) => {
    try {
      await deleteTask.deleteTask(taskId ? taskId : '');
      navigate(-1);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const [taskToDelete, setTaskToDelete] = useState<TaskDetail | null>(null);

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (notFound) {
    return <Navigate to='/404' replace />;
  }

  if (loading) {
    return (
      <main>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: colors.gray[500],
          }}
        >
          <Typography variant='plain' level='h1' mb={4}>
            Loading task
          </Typography>

          <Loader />
        </Box>
      </main>
    );
  }

  if (error) {
    if (error.message.includes('403')) {
      navigate('/tasks');
    } else {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ComponentPlaceholder text='Error loading this task. Please try again later.' />
        </Box>
      );
    }
  }

  return (
    <main className='min-h-0 flex flex-col gap-2 overflow-hidden'>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      {data ? (
        <section className='overflow-y-auto overflow-hidden bg-white rounded-xl p-6 '>
          <section className='flex justify-between overflow-x-scroll lg:overflow-x-hidden gap-x-4 items-center'>
            <h1 className='truncate text-gray text-[2rem]'>{data.title}</h1>
            <div className='flex gap-3'>
              <Button
                onClick={handleEdit}
                sx={{
                  backgroundColor: colors.lightWhite,
                  ':hover': {
                    backgroundColor: colors.orangeChip,
                  },
                  height: '5px',
                }}
                startDecorator={<EditOutlinedIcon sx={{ width: 24, color: colors.gold }} />}
              >
                <Typography sx={{ color: colors.gold }}>Edit</Typography> {showUpdate && <Update />}
              </Button>
              <Button
                onClick={() => setTaskToDelete(data)}
                sx={{
                  backgroundColor: colors.lightWhite,
                  ':hover': {
                    backgroundColor: colors.orangeChip,
                  },
                  height: '5px',
                }}
                startDecorator={<img src={trash_can} alt='Delete' style={{ width: 24 }} />}
              >
                <Typography sx={{ color: colors.gold }}>Delete</Typography>{' '}
                {showUpdate && <Update />}
              </Button>
            </div>
          </section>
          <section className='flex-wrap grid my-2'>
            <p className='grow-0 text-clip overflow-hidden'>{data.description}</p>
          </section>
          <Divider sx={{ marginBottom: '30px' }} />
          <section className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Start date</p>
              <Box
                sx={{
                  bgcolor: colors.lighterGray,
                  padding: 0.5,
                  borderRadius: 4,
                  gap: 2,
                  maxWidth: '200px',
                }}
                className='flex justify-between'
              >
                {dateParser(data.startDate)}
                <img src={calendar} alt='Calendar' className='w-6' />
              </Box>
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Due date</p>
              <Box
                sx={{
                  bgcolor: colors.lighterGray,
                  padding: 0.5,
                  borderRadius: 4,
                  maxWidth: '200px',
                }}
                className='flex justify-between'
              >
                {data.endDate ? dateParser(data.endDate) : 'No due date'}
                <img src={calendar} alt='Calendar' className='w-6 justify-self-end' />
              </Box>
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Status</p>
              <StatusChip status={capitalize(data.status)} />
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Responsible</p>
              {data.employeeFirstName ? (
                <ColorChip label={`${data.employeeFirstName}`} color={`${colors.null}`}></ColorChip>
              ) : (
                <ColorChip label='No employee assigned' color={`${colors.null}`}></ColorChip>
              )}
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Worked Hours</p>
              <ColorChip
                label={`${data.workedHours ? data.workedHours : 0}`}
                color={`${colors.extra}`}
              ></ColorChip>
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Project</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGold,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '95%',
                }}
              >
                {data.projectName}
              </Chip>
            </Box>
          </section>
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
        </section>
      ) : (
        <p className='grow-0 text-2xl text-gold font-medium truncate col-span-2'>Task not found</p>
      )}
    </main>
  );
};

export default TaskDetails;
