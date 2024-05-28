import { Button, Card, Chip, FormControl, Input } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import ExpenseContainerInput from '../../components/modules/Expenses/ExpenseContainerInput';
import ModalConfirmation from '../../components/modules/Expenses/ModalConfirmation';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { ExpenseDraft, InitialStateReimbursement } from '../../types/expense';
import { formatCurrency } from '../../utils/methods';

type ExpenseNewProps = {};

const reimbursementSkeleton: ExpenseDraft = {
  title: '',
  totalAmount: 0,
  supplier: '',
  date: dayjs().startOf('day'),
  urlFile: '',
};

const initialState: InitialStateReimbursement = {
  reason: '',
  date: dayjs().startOf('day'),
  expenses: [reimbursementSkeleton],
  total: 0,
};

const ExpenseNew = ({}: ExpenseNewProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { setState } = useContext(SnackbarContext);
  const [reimbursementRequest, setReimbursementRequest] = useState(initialState);
  const totalAmount = useMemo(
    () => reimbursementRequest.expenses.reduce((total, item) => total + item.totalAmount, 0),
    [reimbursementRequest.expenses]
  );

  const formValidation = (): boolean => {
    if (
      reimbursementRequest.reason.trim() === '' ||
      !reimbursementRequest.date ||
      isNaN(totalAmount)
    ) {
      setState({
        open: true,
        message: 'All of the fields are required',
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
    for (const expense of reimbursementRequest.expenses) {
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
      setOpen(true);
    }
  };

  return (
    <>
      {open && <ModalConfirmation setOpen={setOpen} />}
      <Card className='bg-white font-montserrat' sx={{ padding: '20px' }}>
        <form onSubmit={handleForm}>
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
              <DatePicker
                value={dayjs(reimbursementRequest.date).utc()}
                onChange={e =>
                  setReimbursementRequest({
                    ...reimbursementRequest,
                    date: dayjs(e.target.value).utc(),
                  })
                }
              />
            </FormControl>
          </FormControl>
          <FormControl>
            <label className='text-[#686868] font-semibold text-base my-6'>Expenses:</label>
          </FormControl>
          {reimbursementRequest.expenses.map((_, idx) => (
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
