import { Button, Card, Chip, FormControl, Input, useTheme } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import ExpenseContainerInput from '../../components/modules/Expenses/ExpenseContainerInput';
import ModalConfirmation from '../../components/modules/Expenses/ModalConfirmation';
import { ExpenseContext } from '../../hooks/expenseContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { formatCurrency } from '../../utils/methods';

type ExpenseNewProps = {};

const ExpenseNew = ({}: ExpenseNewProps) => {
  const theme = useTheme();

  const { state, dispatch } = useContext(ExpenseContext);
  const { setState } = useContext(SnackbarContext);

  const totalAmount = useMemo(
    () => state.reimbursementRequest.expenses.reduce((total, item) => total + item.totalAmount, 0),
    [state.reimbursementRequest.expenses]
  );

  const formValidation = (): boolean => {
    if (
      state.reimbursementRequest.reason.trim() === '' ||
      !state.reimbursementRequest.date ||
      isNaN(totalAmount)
    ) {
      setState({
        open: true,
        message: 'All fields are required',
        type: 'danger',
      });
      return false;
    }

    if (totalAmount <= 0) {
      setState({
        open: true,
        message: 'The total cannot be 0 or lower',
        type: 'danger',
      });
      return false;
    }

    for (const expense of state.reimbursementRequest.expenses) {
      if (
        !expense.title ||
        expense.totalAmount <= 0 ||
        !expense.supplier ||
        !expense.date ||
        !expense.urlFile
      ) {
        setState({
          open: true,
          message: 'All expense fields are required and amounts must be greater than zero',
          type: 'danger',
        });
        return false;
      }
    }

    return true;
  };

  const handleForm = (e: any) => {
    e.preventDefault();
    if (formValidation()) {
      dispatch({ type: 'toggle-modal' });
    }
  };

  return (
    <>
      {state.modalOpen && <ModalConfirmation />}
      <Card className='bg-white font-montserrat' sx={{ padding: '20px' }}>
        <form onSubmit={handleForm}>
          <section className='flex flex-col md:flex-row gap-4 items-center'>
            <section className='flex flex-col flex-grow w-full md:w-3/4'>
              <label className='text-[#686868] font-semibold text-base mb-4'>
                Reason for expense*
              </label>
              <Input
                sx={{
                  paddingY: '14px',
                }}
                placeholder='Write the name of the expense'
                value={state.reimbursementRequest.reason}
                onChange={e => dispatch({ type: 'update-reason', payload: e.target.value })}
              />
            </section>
            <section className='flex flex-grow flex-col w-full md:w-1/4'>
              <label className='text-[#686868] font-semibold text-base mb-4'>Date*:</label>
              <DatePicker
                value={
                  state.reimbursementRequest.date
                    ? dayjs(state.reimbursementRequest.date).utc()
                    : null
                }
                onChange={date =>
                  dispatch({ type: 'update-date', payload: date || dayjs().startOf('day') })
                }
              />
            </section>
          </section>
          <FormControl>
            <label className='text-[#686868] font-semibold text-base my-6'>Expenses:</label>
          </FormControl>
          {state.reimbursementRequest.expenses.map((expense, idx) => (
            <ExpenseContainerInput key={idx} index={idx} expense={expense} />
          ))}
          <section className='flex gap-3 justify-end my-8'>
            <p className='text-[#686868] font-semibold text-base'>Total</p>
            <Chip sx={{ backgroundColor: colors.lightGold }}>
              {isNaN(totalAmount) ? formatCurrency(0) : formatCurrency(totalAmount)}
            </Chip>
          </section>
          <section className='flex gap-4 justify-end'>
            <Button
              variant='outlined'
              sx={{
                borderColor: colors.darkerGold,
                color: colors.darkGold,
                '&:hover': {
                  borderColor: colors.darkerGold,
                  background: colors.darkGold,
                  color: 'white',
                },
              }}
            >
              <Link to={'..'} replace>
                Cancel
              </Link>
            </Button>
            <Button
              type='submit'
              sx={{
                background: colors.darkGold,
                '&:hover': {
                  backgroundColor: colors.darkerGold,
                },
              }}
            >
              Send Request
            </Button>
          </section>
        </form>
      </Card>
    </>
  );
};

export default ExpenseNew;
