import { Button, Card, Chip, FormControl, FormLabel, Input } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormEvent, useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import ExpenseContainerInput from '../../components/modules/Expenses/ExpenseContainerInput';
import ExpenserError from '../../components/modules/Expenses/ExpenserError';
import ModalConfirmation from '../../components/modules/Expenses/ModalConfirmation';
import { ExpenseContext } from '../../hooks/expenseContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { formatCurrency } from '../../utils/methods';

type ExpenseNewProps = {};

const ExpenseNew = ({ }: ExpenseNewProps) => {
  const { state, dispatch } = useContext(ExpenseContext);
  const { setState } = useContext(SnackbarContext);

  const [errors, setErrors] = useState({
    title: '',
    startDate: '',
    totalAmount: '',
    expense: {
      expenseTitle: '',
      totalAmount: '',
      supplier: '',
      date: '',
      urlFile: '',
    },
  });

  const MIN_DATE = dayjs('2000-01-01T00:00:00.000Z');
  const MAX_DATE = dayjs(Date.now());

  /**
   * Calculates the total amount of all expenses.
   */
  const totalAmount = useMemo(
    () => state.reimbursementRequest.expenses.reduce((total, item) => total + item.totalAmount, 0),
    [state.reimbursementRequest.expenses]
  );

  /**
   * Validates the form before submitting.
   * @returns {boolean} - Whether the form is valid or not.
   */
  const formValidation = (): boolean => {
    let isValid = true;
    const newErrors = {
      title: '',
      startDate: '',
      totalAmount: '',
      expense: {
        expenseTitle: '',
        totalAmount: '',
        supplier: '',
        date: '',
        urlFile: '',
      },
    };

    if (state.reimbursementRequest.title.trim() === '') {
      newErrors.title = 'Title cannot be empty';
      isValid = false;
    }

    if (!state.reimbursementRequest.startDate) {
      newErrors.startDate = 'Date is required';
      isValid = false;
    } else {
      if (state.reimbursementRequest.startDate < MIN_DATE) {
        newErrors.startDate = 'The report cannot have a date before the year 2000';
        isValid = false;
      }
      if (state.reimbursementRequest.startDate > MAX_DATE) {
        newErrors.startDate = 'The report cannot have a date after today';
        isValid = false;
      }
    }

    if (isNaN(totalAmount) || totalAmount <= 0) {
      newErrors.totalAmount = 'The total cannot be 0 or lower';
      isValid = false;
    }

    for (const expense of state.reimbursementRequest.expenses) {
      if (!expense.title || expense.title.trim() === '') {
        newErrors.expense.expenseTitle = 'Expense title cannot be empty';
        isValid = false;
      }

      if (!expense.totalAmount || expense.totalAmount <= 0) {
        newErrors.expense.totalAmount = 'Total amount cannot be 0 or lower';
        isValid = false;
      }

      if (!expense.date) {
        newErrors.expense.date = 'Date is required';
        isValid = false;
      } else {
        if (expense.date < MIN_DATE) {
          newErrors.expense.date = 'The expense cannot have a date before the year 2000';
          isValid = false;
        }
        if (expense.date > MAX_DATE) {
          newErrors.expense.date = 'The expense cannot have a date after today';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles the form submission.
   * @param e - The form submission event.
   */
  const handleForm = (e: FormEvent) => {
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
          <section className='flex flex-col md:flex-row gap-4 items-start'>
            <section className='flex flex-grow flex-col w-full md:w-3l/4'>
              <FormLabel>
                Reason for expense <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                sx={{
                  paddingY: '14px',
                }}
                error={errors.title}
                placeholder='Write the name of the expense'
                value={state.reimbursementRequest.title}
                onChange={e => {
                  dispatch({ type: 'update-reason', payload: e.target.value });
                  setErrors((errors.title = ''), ...errors);
                }}
              />
              {errors.title && <ExpenserError>{errors.title}</ExpenserError>}
            </section>
            <section className='flex flex-grow flex-col w-full md:w-1/4'>
              <FormLabel>
                Date <span className='text-red-600'>*</span>
              </FormLabel>
              <DatePicker
                value={
                  state.reimbursementRequest.startDate
                    ? dayjs(state.reimbursementRequest.startDate).utc()
                    : null
                }
                onChange={date => {
                  dispatch({ type: 'update-date', payload: date || dayjs().startOf('day') });
                  setErrors((errors.startDate = ''), ...errors);
                }}
                slotProps={{ textField: { error: !!errors.startDate } }}
              />
              {errors.startDate && <ExpenserError>{errors.startDate}</ExpenserError>}
            </section>
          </section>
          <FormControl>
            <label className='text-[#686868] font-semibold text-base my-6'>Expenses:</label>
          </FormControl>
          {state.reimbursementRequest.expenses.map((expense, idx) => (
            <ExpenseContainerInput key={idx} index={idx} expense={expense} errors={errors} />
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
              <Link to={'..'} replace onClick={() => dispatch({ type: 'restart-request' })}>
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
