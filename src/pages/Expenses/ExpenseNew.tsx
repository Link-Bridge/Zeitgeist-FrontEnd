import { Button, Card, Chip, FormControl, Input } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import ExpenseContainerInput from '../../components/modules/Expenses/ExpenseContainerInput';
import { ExpenseDraft, InitialStateReimbursement } from '../../types/expense';
import { formatCurrency } from '../../utils/methods';

type ExpenseNewProps = {};

const reimbursementSkeleton: ExpenseDraft = {
  title: '',
  totalAmount: 0,
  supplier: '',
  date: new Date(),
  urlFile: '',
};

const initialState: InitialStateReimbursement = {
  reason: '',
  date: new Date(),
  expenses: [reimbursementSkeleton] as ExpenseDraft[],
  total: 0,
};

const ExpenseNew = ({}: ExpenseNewProps) => {
  const [reimbursementRequest, setReimbursementRequest] =
    useState<InitialStateReimbursement>(initialState);
  const totalAmount = useMemo(
    () => reimbursementRequest.expenses.reduce((total, item) => total + item.totalAmount, 0),
    [reimbursementRequest.expenses]
  );
  return (
    <Card className='bg-white font-montserrat' sx={{ padding: '20px' }}>
      <form>
        <FormControl
          sx={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}
        >
          <FormControl sx={{ flexGrow: '1' }}>
            <label className='text-[#686868] font-semibold text-base mb-4'>
              Reason for expense*
            </label>
            <Input sx={{ paddingY: '14px' }} placeholder='Write the name of the expense' />
          </FormControl>
          <FormControl>
            <label className='text-[#686868] font-semibold text-base mb-4'>Date*:</label>
            <DatePicker
              value={null}
              onChange={e => {}}
              //   slotProps={{ textField: { error: !!form.errors.endDate } }}
            />
          </FormControl>
        </FormControl>
        <FormControl>
          <label className='text-[#686868] font-semibold text-base mt-6'>Expenses:</label>
        </FormControl>
        {reimbursementRequest.expenses.map(reimbursement => (
          <ExpenseContainerInput
            index={0}
            reimbursementSkeleton={reimbursementSkeleton}
            reimbursementRequest={reimbursementRequest}
            setReimbursementRequest={setReimbursementRequest}
          />
        ))}
        <section className='flex gap-3 justify-end my-8'>
          <p className='text-[#686868] font-semibold text-base'>Total</p>
          <Chip sx={{ backgroundColor: colors.lightGold }}>{formatCurrency(totalAmount)}</Chip>
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
  );
};
export default ExpenseNew;
