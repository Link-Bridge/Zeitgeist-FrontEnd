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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskDetail | null>(null);

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <div>Error loading task</div>;
  }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <GoBack />
      </Box>

      <br />
      <main className='p-10 py-4 h-[calc(100vh-190px)] overflow-scroll overflow-x-hidden'>
        {data ? (
          <>
            <Box
              sx={{
                borderRadius: 8,
                padding: 5,
                paddingBottom: 8,
                bgcolor: 'white',
                boxShadow: '2px 5px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '10px',
                }}
              >
                <h1
                  style={{
                    color: 'gray',
                    fontSize: '2rem',
                    lineHeight: '1.1',
                    letterSpacing: '1.5px',
                  }}
                >
                  {data.title}
                </h1>

                <Box
                  sx={{
                    alignContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '15px',
                    }}
                  >
                    <button onClick={handleEdit}>
                      <img src={pencil} alt='Edit' className='w-6' />
                      {showUpdate && <Update />}
                    </button>

                    <button onClick={() => setTaskToDelete(data)}>
                      <img src={trash_can} alt='Delete/Archive' className='w-6' />
                    </button>
                  </Box>
                </Box>
              </Box>

              <br />

              <Box sx={{ width: '80%' }}>
                <p>{data.description}</p>
              </Box>

              <br />
              <br />

              <Box
                sx={{
                  display: 'flex',
                  gap: '60px',
                }}
              >
                <Box>
                  <p style={{ fontSize: '.9rem' }}>Start date</p>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '50px',
                      bgcolor: colors.lighterGray,
                      padding: 0.5,
                      borderRadius: 4,
                    }}
                  >
                    {dateParser(data.startDate)}
                    <img src={calendar} alt='Calendar' className='w-6' />
                  </Box>
                </Box>

                {data.endDate && (
                  <Box>
                    <p style={{ fontSize: '.5rem' }}>Due date</p>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '50px',
                        bgcolor: colors.lighterGray,
                        padding: 0.5,
                        borderRadius: 4,
                      }}
                    >
                      {dateParser(data.endDate)}
                      <img src={calendar} alt='Calendar' className='w-6' />
                    </Box>
                  </Box>
                )}

                {data.status && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Status</p>
                    <StatusChip status={capitalize(data.status)} />
                  </Box>
                )}
              </Box>

              <br />
              <br />

              <Box
                sx={{
                  display: 'flex',
                  gap: '80px',
                }}
              >
                {data.employeeFirstName && data.employeeLastName && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Responsible</p>
                    <ColorChip label={data.employeeFirstName} color={`${colors.null}`}></ColorChip>
                  </Box>
                )}
                {data.waitingFor && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Waiting for</p>
                    <ColorChip label={data.waitingFor} color={`${colors.null}`}></ColorChip>
                  </Box>
                )}
                {data.workedHours && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Worked Hours</p>
                    <ColorChip label={`${data.workedHours}`} color={`${colors.extra}`}></ColorChip>
                  </Box>
                )}
                <Box>
                  <p style={{ fontSize: '.9rem' }}>Project</p>
                  <ColorChip
                    label={`${data.projectName}`}
                    color={`${colors.lightGold}`}
                  ></ColorChip>
                </Box>
              </Box>

              <br />
            </Box>

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
        ) : (
          <p>Task not found</p>
        )}
      </main>
    </>
  );
};

export default Task;
