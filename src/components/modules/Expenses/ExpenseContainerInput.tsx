import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormLabel, Input, useTheme } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ChangeEvent, useContext } from 'react';
import colors from '../../../colors';
import { ExpenseContext } from '../../../hooks/expenseContext';
import { ExpenseDraft } from '../../../types/expense';
import ExpenserError from './ExpenserError';

type ExpenseContainerInputProps = {
  index: number;
  expense: ExpenseDraft;
  errors: {
    title: string;
    startDate: Date;
    totalAmount: number;
    expense: {
      expenseTitle: string;
      totalAmount: number;
      supplier: string;
      date: Date;
      urlFile: string;
    };
  };
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

const ExpenseContainerInput = ({ index, expense, errors }: ExpenseContainerInputProps) => {
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
      <div className={`flex flex-wrap items-start gap-3 ${index === 0 ? 'mt-0' : 'mt-10'}`}>
        <p className='text-[#686868] font-semibold text-base'>{`${index + 1}.`}</p>
        <main className='flex flex-col flex-1'>
          <section className='flex flex-col md:flex-row flex-1 gap-4'>
            <div className='w-full md:w-[80%]'>
              <FormLabel>
                Expense <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                error={errors.expense.expenseTitle}
                sx={{
                  paddingY: '14px',
                }}
                type='text'
                placeholder='Expense Description'
                name='title'
                value={expense.title}
                onChange={handleInputChange}
              />
              {errors.expense.expenseTitle && (
                <ExpenserError>{errors.expense.expenseTitle}</ExpenserError>
              )}
            </div>
            <div className='w-full md:w-[20%]'>
              <FormLabel>
                Amount <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                error={errors.expense.totalAmount}
                sx={{
                  paddingY: '14px',
                }}
                type='number'
                placeholder='$000.00 *'
                name='totalAmount'
                value={expense.totalAmount}
                onChange={handleInputChange}
              />
              {errors.expense.totalAmount && (
                <ExpenserError>{errors.expense.totalAmount}</ExpenserError>
              )}
            </div>
          </section>
          <section className='flex flex-col md:flex-row flex-1 gap-4 items-start mt-4'>
            <div className='w-full md:w-[20%]'>
              <FormLabel>Supplier</FormLabel>
              <Input
                sx={{ width: '100%', paddingY: '14px' }}
                type='text'
                placeholder='Supplier'
                name='supplier'
                value={expense.supplier!}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-full'>
              <FormLabel>
                Date <span className='text-red-600'>*</span>
              </FormLabel>
              <DatePicker
                sx={{ width: '100%' }}
                value={dayjs(expense.date).utc()}
                onChange={handleDateChange}
                slotProps={{ textField: { error: !!errors.expense.date } }}
              />
              {errors.expense.date && <ExpenserError>{errors.expense.date}</ExpenserError>}
            </div>

            <section className='flex flex-col flex-1 items-start w-full'>
              <FormLabel>Link to voucher</FormLabel>
              <div className='flex flex-row items-center w-full gap-3'>
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
            <div className='bg-gold rounded-md h-8 w-8 flex items-center justify-center cursor-pointer'>
              <RemoveIcon className='text-white px-1 my-auto' onClick={handleRemoveExpense} />
            </div>
          )}
        </article>
      </div>
      {state.reimbursementRequest.expenses.length < 30 &&
        index === state.reimbursementRequest.expenses.length - 1 && (
          <div className='bg-gold rounded-md h-8 w-8 flex items-center justify-center mx-auto mt-6 cursor-pointer'>
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
