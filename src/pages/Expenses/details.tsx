import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import LinkIcon from '@mui/icons-material/Link';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Box, Button, Sheet, Typography } from '@mui/joy';
import Divider from '@mui/material/Divider';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import trash_can from '../../assets/icons/trash_can.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import GoBack from '../../components/common/GoBack';
import Loader from '../../components/common/Loader';
import { ExpensesTable } from '../../components/modules/Expenses/ExpensesTable';
import StatusChip from '../../components/modules/Expenses/StatusChip';
import useHttp from '../../hooks/useHttp';
import { ExpenseReport } from '../../types/expense';
import { APIPath, RequestMethods } from '../../utils/constants';

function capitalize(data: string): string {
  return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
}

const ExpenseDetails = () => {
  function employeeNameParser(firstName: string | undefined, lastName: string | undefined): void {
    if (firstName && lastName) {
      setEmployeeName(`${firstName} ${lastName}`);
    }
  }

  const { id } = useParams();
  const [employeeName, setEmployeeName] = useState<string>('');
  const [notFound, setNotFound] = useState(false);
  const [notAuthorized, setNotAuthorized] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expenseReportToDelete, setDelete] = useState<ExpenseReport | null>(null);
  const { data, loading, sendRequest, error } = useHttp<ExpenseReport>(
    `${APIPath.EXPENSE_REPORT}/${id}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (!data) {
      sendRequest();
    } else {
      employeeNameParser(data.employeeFirstName, data.employeeLastName);
    }
  }, [data]);

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('unexpected error')) {
        setNotFound(true);
      }
      if (message.includes('Unauthorized employee')) {
        setNotAuthorized(true);
      }
    }
  }, [error]);

  if (notFound || notAuthorized) {
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
            <p className='grow-0 text-wrap break-words'>{data.description}</p>
          </section>
          <Divider sx={{ marginBottom: '10px' }} />
          <section className='grid grid-cols-2 lg:grid-cols-4 items-center mb-8'>
            <Box>
              <p style={{ fontSize: '.9rem' }}>Status</p>
              <StatusChip status={data.status ? capitalize(data.status) : 'NONE'} />
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
              {employeeName != '' ? (
                <ColorChip label={`${employeeName}`} color={`${colors.null}`}></ColorChip>
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
                {dayjs.utc(data.startDate).format('DD/MM/YYYY')}
              </Box>
            </Box>
          </section>
          <section className='mb-4'>
            <Sheet className='max-h-[132px] lg:max-h-[230px]' sx={{ overflow: 'auto' }}>
              <ExpensesTable expenses={data.expenses || []}></ExpensesTable>
            </Sheet>
          </section>
          <section className='flex justify-between items-center'>
            {data.status == 'Payed' ? (
              <Button
                component='a'
                href={data.urlVoucher ? data.urlVoucher : ''}
                variant='plain'
                startDecorator={<LinkIcon />}
                target='_blank'
                sx={{
                  color: colors.gold,
                  ':hover': { backgroundColor: colors.lighterGray },
                }}
              >
                Link to voucher
              </Button>
            ) : (
              <div></div>
            )}
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
        <section className='overflow-y-auto overflow-hidden bg-white rounded-xl p-6 '>
          <Typography variant='plain' level='h1'>
            No data available
          </Typography>
        </section>
      )}
    </main>
  );
};

export default ExpenseDetails;
