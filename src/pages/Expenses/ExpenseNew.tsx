import { Button, Card, Chip, FormControl, Input } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import ExpenseContainerInput from '../../components/modules/Expenses/ExpenseContainerInput';
import ModalConfirmation from '../../components/modules/Expenses/ModalConfirmation';
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
  expenses: [reimbursementSkeleton],
  total: 0,
};

const ExpenseNew = ({}: ExpenseNewProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [reimbursementRequest, setReimbursementRequest] = useState(initialState);
  const totalAmount = useMemo(
    () => reimbursementRequest.expenses.reduce((total, item) => total + item.totalAmount, 0),
    [reimbursementRequest.expenses]
  );

  return (
    <>
      {open && <ModalConfirmation />}
      <Card className='bg-white font-montserrat' sx={{ padding: '20px' }}>
        <form>
          <FormControl
            sx={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}
          >
            <FormControl sx={{ flexGrow: '1' }}>
              <label className='text-[#686868] font-semibold text-base mb-4'>
                Reason for expense*
              </label>
              <Input
                sx={{ paddingY: '14px' }}
                placeholder='Write the name of the expense'
                value={reimbursementRequest.reason}
                onChange={e =>
                  setReimbursementRequest(prevState => ({
                    ...prevState,
                    reason: e.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl>
              <label className='text-[#686868] font-semibold text-base mb-4'>Date*:</label>
              <DatePicker value={dayjs(reimbursementRequest.date).utc()} onChange={() => {}} />
            </FormControl>
          </FormControl>
          <FormControl>
            <label className='text-[#686868] font-semibold text-base my-6'>Expenses:</label>
          </FormControl>
          {reimbursementRequest.expenses.map((reimbursement, idx) => (
            <ExpenseContainerInput
              key={idx}
              index={idx}
              reimbursementSkeleton={reimbursementSkeleton}
              setReimbursementRequest={setReimbursementRequest}
              reimbursementRequest={reimbursementRequest}
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
              onClick={() => setOpen(true)}
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
