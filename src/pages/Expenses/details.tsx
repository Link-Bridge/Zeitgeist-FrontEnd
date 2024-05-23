import { Box, Typography } from '@mui/joy';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import colors from '../../colors';
import Loader from '../../components/common/Loader';
import useHttp from '../../hooks/useHttp';
import { ExpenseReport } from '../../types/expense';
import { APIPath, RequestMethods } from '../../utils/constants';

const ExpenseDetails = () => {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
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
    <div>
      <h1>Expense Details</h1>
    </div>
  );
};

export default ExpenseDetails;
