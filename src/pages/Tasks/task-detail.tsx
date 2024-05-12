import { Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import calendar from '../../assets/icons/black_calendar.svg';
import pencil from '../../assets/icons/pencil.svg';
import trash_can from '../../assets/icons/trash_can.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import DeleteModal from '../../components/common/DeleteModal';
import GoBack from '../../components/common/GoBack';
import Loader from '../../components/common/Loader';
import StatusChip from '../../components/common/StatusChip';
import useDeleteTask from '../../hooks/useDeleteTask';
import useHttp from '../../hooks/useHttp';
import Update from '../../pages/Tasks/update';
import { TaskDetail } from '../../types/task';
import { APIPath, RequestMethods } from '../../utils/constants';

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

const Task: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop();

  const navigate = useNavigate();
  const { data, loading, sendRequest, error } = useHttp<TaskDetail>(
    `${APIPath.TASK_DETAIL}/${id}`,
    RequestMethods.GET
  );

  const handleClick = () => {
    navigate('/tasks');
  };

  const [showUpdate, setShowUpdate] = useState(false);

  const handleEdit = () => {
    setShowUpdate(true);
    navigate(`/tasks/update/${id}`);
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
    return <div>Error loading task</div>;
  }

  return (
    <main>

      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      
      {data ? (
        <section className='bg-white rounded-xl p-6 overflow-hidden'>

          <section className='flex-wrap grid grid-cols-3 mb-8'>

            <h1
              className='grow-0 truncate col-span-2 text-gray text-[2rem]'
            >
              {data.title}
            </h1>

            <div className='flex justify-end items-center gap-5'>
              <button onClick={handleEdit}>
                <img src={pencil} alt='Edit' className='w-6' />
                {showUpdate && <Update />}
              </button>

              <button onClick={() => setTaskToDelete(data)}>
                <img src={trash_can} alt='Delete/Archive' className='w-6' />
              </button>
            </div>
          </section>

          <section className='flex-wrap grid mb-8'>
            <p className='grow-0 truncate'>{data.description}</p>
          </section>

          <section className='grid grid-cols-2 mb-8 justify-stretch'>
            <div className='flex-initial grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-start'>
              <Box className='grid grid-cols-1'>
                <p style={{ fontSize: '.9rem' }}>Start date</p>
                <Box
                  sx={{
                    bgcolor: colors.lighterGray,
                    padding: 0.5,
                    borderRadius: 4,
                  }}
                  className='grid md:grid-cols-1 lg:grid-cols-2 justify-stretch'
                >
                  {dateParser(data.startDate)}
                  <img src={calendar} alt='Calendar' className='w-6 justify-self-end' />
                </Box>
              </Box>

              <Box className='grid grid-cols-1'>
                <p style={{ fontSize: '.9rem' }}>Due date</p>
                <Box
                  sx={{
                    bgcolor: colors.lighterGray,
                    padding: 0.5,
                    borderRadius: 4,
                  }}
                  className='grid md:grid-cols-1 lg:grid-cols-2 justify-stretch'
                >
                  {dateParser(data.endDate)}
                  <img src={calendar} alt='Calendar' className='w-6 justify-self-end' />
                </Box>
              </Box>

              <Box>
                <p style={{ fontSize: '.9rem' }}>Status</p>
                <StatusChip status={capitalize(data.status)} />
              </Box>
            </div>
          </section>

          <section className='grid grid-cols-2 justify-stretch'>
            <div className='flex-initial grid md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-start'>
              <Box>
                <p style={{ fontSize: '.9rem' }}>Responsible</p>
                <ColorChip label={`${data.employeeFirstName}`} color={`${colors.null}`}></ColorChip>
              </Box>

              <Box>
                <p style={{ fontSize: '.9rem' }}>Worked Hours</p>
                <ColorChip label={`${data.workedHours}`} color={`${colors.extra}`}></ColorChip>
              </Box>

              <Box>
                <p style={{ fontSize: '.9rem' }}>Project</p>
                <ColorChip
                  label={`${data.projectName}`}
                  color={`${colors.lightGold}`}
                ></ColorChip>
              </Box>
            </div>
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

export default Task;
