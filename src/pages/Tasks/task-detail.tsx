import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import left_arrow from '../../assets/icons/left_arrow.svg';
import pencil from '../../assets/icons/pencil.svg';
import calendar from '../../assets/icons/black_calendar.svg';
import trash_can from '../../assets/icons/trash_can.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import StatusChip from '../../components/common/StatusChip';
import useHttp from '../../hooks/useHttp';
import { TaskDetail } from '../../types/task';
import { APIPath, RequestMethods } from '../../utils/constants';

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}/${month}/${year}`;
}

const Task: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, sendRequest, error } = useHttp<TaskDetail>(
    `${APIPath.TASK_DETAIL}/${id}`,
    RequestMethods.GET
  );
  const keyMap = new Map<string, string>([
    ['done', 'Done'],
    ['inprogress', 'In process'],
    ['underrevision', 'Under Revision'],
    ['delayed', 'Delayed'],
    ['postponed', 'Postponed'],
    ['notstarted', 'Not started'],
    ['cancelled', 'Cancelled'],
  ]);

  const handleClick = () => {
    navigate('/tasks');
  };

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
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
        <img src={left_arrow} alt='Go back' className='w-3.5' />
        <Link
          underline='none'
          className='ml-auto'
          sx={{
            color: colors.darkGold, // Llamar el color correspondiente
            '&:hover': {
              color: colors.darkerGold,
            },
          }}
        >
          &nbsp;Go Back
        </Link>
      </Box>

      <br />
      <main className='p-10 py-4 h-[calc(100vh-190px)] overflow-scroll overflow-x-hidden'>
        {data ? (
          <>
            <Box sx={{ borderRadius: 8, padding: 5, paddingBottom: 8, bgcolor: 'white', boxShadow: '2px 5px 4px rgba(0, 0, 0, 0.2)'}}>
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
                  <Box sx={{
                    display: 'flex',
                    gap: '15px',
                  }}>
                    <img src={pencil} alt='Edit' className='w-6' />
                    <img src={trash_can} alt='Delete/Archive' className='w-6' />
                  </Box>
                </Box>
              </Box>

              <br/>
              
              <Box sx={{width: '80%'}}>
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
                  <Box sx={{
                    display: 'flex',
                    gap: '50px',
                    bgcolor: colors.lighterGray, 
                    padding: 0.5, 
                    borderRadius: 4
                  }}>
                    {dateParser(data.startDate)}
                    <img src={calendar} alt='Calendar' className='w-6' />
                  </Box>
                </Box>

                {data.endDate && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Due date</p>
                    <Box sx={{
                      display: 'flex',
                      gap: '50px',
                      bgcolor: colors.lighterGray, 
                      padding: 0.5, 
                      borderRadius: 4
                    }}>
                      {dateParser(data.endDate)}
                      <img src={calendar} alt='Calendar' className='w-6' />
                    </Box>
                  </Box>
                )}

                <Box>
                  <p style={{ fontSize: '.9rem' }}>Status</p>
                  <StatusChip status={`${data.status || '-'}`} />
                </Box>
              </Box>

              <br/>
              <br/> 

              <Box
                sx={{
                  display: 'flex',
                  gap: '80px',
                }}
              >
                {data.employeeFirstName && data.employeeLastName && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Responsible</p>
                    <ColorChip
                      label={data.employeeFirstName}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                )}

                {data.waitingFor && (
                    <Box>
                    <p style={{ fontSize: '.9rem' }}>Waiting for</p>
                    <ColorChip
                      label={data.waitingFor}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                )}


                {data.workedHours && (
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Worked Hours</p>
                    <ColorChip
                      label={`${data.workedHours}`}
                      color={`${colors.extra}`}
                    ></ColorChip>
                  </Box>
                )}  

                <Box>
                  <p style={{ fontSize: '.9rem' }}>Project Name</p>
                  <ColorChip
                    label={`${data.projectName}`}
                    color={`${colors.lightGold}`}
                  ></ColorChip>
                </Box>
              </Box>
              
              <br />
              
            </Box>
          </>
        ) : (
          <p>Task not found</p>
        )}
      </main>
    </>
  );
};

export default Task;
