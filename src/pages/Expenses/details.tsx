import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Button, Typography } from '@mui/joy';
import Divider from '@mui/material/Divider';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import trash_can from '../../assets/icons/trash_can.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import GoBack from '../../components/common/GoBack';
import Loader from '../../components/common/Loader';
import useHttp from '../../hooks/useHttp';
import { ExpenseReport } from '../../types/expense';
import { APIPath, RequestMethods } from '../../utils/constants';

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}/${month}/${year}`;
}

const ExpenseDetails = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [ERToDelete, setDelete] = useState<ExpenseReport | null>(null);
  const { data, loading, sendRequest, error } = useHttp<ExpenseReport>(
    `${APIPath.EXPENSE_REPORT}/${id}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
  }, [data]);

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('unexpected error')) {
        setNotFound(true);
      }
    }
  }, [error]);

  if (notFound) {
    return <Navigate to='/404' replace />;
  }

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
          Loading expense report details...
        </Typography>

        <Loader />
      </Box>
    );
  }

  return (
    <main className='min-h-0 flex flex-col gap-2 overflow-hidden'>
      <Box
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
                //onClick={}
                sx={{
                  backgroundColor: colors.lightWhite,
                  ':hover': {
                    backgroundColor: colors.orangeChip,
                  },
                  height: '5px',
                }}
                startDecorator={<PictureAsPdfIcon sx={{ width: 24, color: colors.gold }} />}
              >
                <Typography sx={{ color: colors.gold }}>Download</Typography>
              </Button>
              <Button
                onClick={() => setDelete(data)}
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
              </Button>
            </div>
          </section>
          <section className='flex-wrap grid my-2'>
            <p className='grow-0 text-clip overflow-hidden'>{data.description}</p>
          </section>
          <Divider sx={{ marginBottom: '30px' }} />
          <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 items-center'>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Status</p>
              {/* <StatusChip status={capitalize(data.status)} /> */}
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Total</p>
              <ColorChip
                label={`\$ ${data.totalAmount ? data.totalAmount : 0}`}
                color={`${colors.lightGold}`}
              ></ColorChip>
            </Box>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Name</p>
              {data.idEmployee ? (
                <ColorChip label={`${data.idEmployee}`} color={`${colors.null}`}></ColorChip>
              ) : (
                <ColorChip label='No employee assigned' color={`${colors.null}`}></ColorChip>
              )}
            </Box>
            <Box className='flex items-center self-end gap-2'>
              <EventNoteRoundedIcon />
              <p style={{ fontSize: '.9rem' }}>Date: </p>
              <Box
                sx={{
                  padding: 0.5,
                  borderRadius: 4,
                  gap: 2,
                }}
                className='flex flex-row'
              >
                {dateParser(data.startDate)}
              </Box>
            </Box>
          </section>
          <section className='flex justify-end '>
            <Box className='flex flex-row gap-4'>
              <p style={{ fontSize: '.9rem' }}>Total: </p>
              <ColorChip
                label={`\$ ${data.totalAmount ? data.totalAmount : 0}`}
                color={`${colors.lightGold}`}
              ></ColorChip>
            </Box>
          </section>
        </section>
      ) : (
        <Typography variant='plain' level='h1' mb={4}>
          <p className='grow-0 text-2xl font-medium break-words col-span-2'>{`Expense with id: ${id} not found`}</p>
        </Typography>
      )}
    </main>
  );
};

export default ExpenseDetails;
