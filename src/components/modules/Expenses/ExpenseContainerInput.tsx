import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import RemoveIcon from '@mui/icons-material/Remove';
import { Input, useTheme } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ChangeEvent, useContext } from 'react';
import colors from '../../../colors';
import { ExpenseContext } from '../../../hooks/expenseContext';
import { ExpenseDraft } from '../../../types/expense';

type ExpenseContainerInputProps = {
  index: number;
  expense: ExpenseDraft;
};

/**
 * Expense container inputs component
 *
 * @component
 * @param {ExpenseContainerInputProps} props - Page props
 * @param {number} props.index - The index of the expense
 * @param {ExpenseDraft} props.expense - The expense with the complete information
 *
 * @returns {JSX.Element} Expense Containter that stores inputs
 */

const ExpenseContainerInput = ({ index, expense }: ExpenseContainerInputProps) => {
  const theme = useTheme();
  const { state, dispatch } = useContext(ExpenseContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'update-expense',
      payload: { index, field: name, value: name === 'totalAmount' ? parseFloat(value) : value },
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    dispatch({ type: 'update-expense', payload: { index, field: 'date', value: date } });
  };

  const handleRemoveExpense = () => {
    dispatch({ type: 'remove-expense', payload: index });
  };

  return (
    <>
      <div className={`flex items-start gap-3 ${index === 0 ? 'mt-0' : 'mt-10'}`}>
        <p className='text-[#686868] font-semibold text-base'>{`${index + 1}.`}</p>
        <main className='flex flex-col flex-1'>
          <section className='flex flex-col md:flex-row flex-1 gap-4'>
            <Input
              sx={{
                width: '100%',
                paddingY: '14px',
                [theme.breakpoints.up('md')]: {
                  width: '80%',
                },
              }}
              type='text'
              placeholder='Expense Description'
              name='title'
              value={expense.title}
              onChange={handleInputChange}
            />
            <Input
              sx={{
                width: '100%',
                paddingY: '14px',
                [theme.breakpoints.up('md')]: {
                  width: '20%',
                },
              }}
              type='number'
              placeholder='$000.00'
              name='totalAmount'
              value={expense.totalAmount}
              onChange={handleInputChange}
            />
          </section>
          <section className='flex flex-col md:flex-row flex-1 gap-4 items-center mt-4'>
            <Input
              sx={{ width: '100%', paddingY: '14px' }}
              type='text'
              placeholder='Supplier'
              name='supplier'
              value={expense.supplier!}
              onChange={handleInputChange}
            />
            <DatePicker
              sx={{ width: '100%' }}
              value={dayjs(expense.date).utc()}
              onChange={handleDateChange}
            />
            <section className='flex flex-1 items-center gap-4 w-full'>
              <div className='flex items-center w-full gap-3'>
                <LinkIcon sx={{ color: colors.gold }} />
                <Input
                  sx={{
                    width: '100%',
                    paddingY: '14px',
                    borderColor: colors.gold,
                    '& input::placeholder': {
                      color: colors.darkGold,
                    },
                  }}
                  type='text'
                  placeholder='URL'
                  name='urlFile'
                  value={expense.urlFile!}
                  onChange={handleInputChange}
                />
              </div>
            </section>
          </section>
        </main>
        <article>
          {index !== 0 && (
            <div className='bg-gold rounded-md h-8 w-8 flex items-center justify-center'>
              <RemoveIcon className='text-white px-1 my-auto' onClick={handleRemoveExpense} />
            </div>
          )}
        </article>
      </div>
      {state.reimbursementRequest.expenses.length < 30 &&
        index === state.reimbursementRequest.expenses.length - 1 && (
          <div className='bg-gold rounded-md h-8 w-8 flex items-center justify-center mx-auto mt-6'>
            <AddIcon
              className='text-white px-1'
              onClick={() => dispatch({ type: 'add-expense' })}
            />
          </div>
        )}
    </>
  );
};

export default ExpenseContainerInput;
