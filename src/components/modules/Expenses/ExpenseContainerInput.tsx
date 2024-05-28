import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import RemoveIcon from '@mui/icons-material/Remove';
import { Input } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import { Dispatch, SetStateAction } from 'react';
import colors from '../../../colors';
import { ExpenseDraft, InitialStateReimbursement } from '../../../types/expense';

type ExpenseContainerInputProps = {
  index: number;
  reimbursementSkeleton: ExpenseDraft;
  setReimbursementRequest: Dispatch<
    SetStateAction<{
      reason: string;
      date: Date;
      expenses: ExpenseDraft[];
      total: number;
    }>
  >;
  reimbursementRequest: InitialStateReimbursement;
};

const ExpenseContainerInput = ({
  index,
  reimbursementSkeleton,
  setReimbursementRequest,
  reimbursementRequest,
}: ExpenseContainerInputProps) => {
  const handleAddExpense = () => {
    if (reimbursementRequest.expenses.length < 30) {
      setReimbursementRequest(prevState => ({
        ...prevState,
        expenses: [...prevState.expenses, reimbursementSkeleton],
      }));
    }
  };

  return (
    <div className='flex items-start gap-3 mt-6'>
      <p className='text-[#686868] font-semibold text-base'>{`${index + 1}.`}</p>
      <main className='flex-1'>
        <section className='flex flex-1 gap-4'>
          <Input
            sx={{ width: '80%', paddingY: '14px' }}
            type='text'
            placeholder='Expense Description'
          />
          <Input sx={{ paddingY: '14px' }} type='number' placeholder='$000.000' />
        </section>
        <section className='flex flex-1 gap-4 mt-4'>
          <Input sx={{ width: '35%' }} type='text' placeholder='Supplier' />
          <DatePicker
            value={null}
            onChange={e => {}}
            //   slotProps={{ textField: { error: !!form.errors.endDate } }}
          />
          <div className='flex flex-1 w-full items-center gap-2'>
            <LinkIcon className='text-gold' />
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
              placeholder='Link to invoice'
            />
          </div>
        </section>
      </main>
      <section className='flex flex-col gap-2'>
        <div className='bg-gold rounded-md'>
          <AddIcon className='text-white px-1' onClick={handleAddExpense} />
        </div>
        {index !== 0 && (
          <div className='bg-gold rounded-md'>
            <RemoveIcon className='text-white px-1' />
          </div>
        )}
      </section>
    </div>
  );
};

export default ExpenseContainerInput;
