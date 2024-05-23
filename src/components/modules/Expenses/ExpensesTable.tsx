import LinkIcon from '@mui/icons-material/Link';
import { Button, Table } from '@mui/joy';
import dayjs from 'dayjs';
import colors from '../../../colors';
import { ExpenseEntity } from '../../../types/expense';
import ComponentPlaceholder from '../../common/ComponentPlaceholder';

type ExpensesTableProps = {
  expenses: ExpenseEntity[];
};

const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  if (expenses?.length === 0) {
    <ComponentPlaceholder
      text='No expenses associated to this Report were found.'
      width='20vh'
      height='15vh'
    />;
  }

  return (
    <Table
      stickyHeader
      sx={{
        minWidth: '800px',
        '& tr > *:not(:first-of-type)': { textAlign: 'center' },
      }}
    >
      <thead>
        <tr>
          <th style={{ width: '30%' }}>Description</th>
          <th>Date</th>
          <th>Supplier</th>
          <th>Invoice</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {expenses?.map(expense => (
          <tr key={expense.id}>
            <td className='truncate'>{expense.title}</td>
            <td>{expense.date ? dayjs.utc(expense.date).format('DD/MM/YYYY') : 'No due date'}</td>
            <td>{'-'}</td>
            <td>
              {expense.urlFile ? (
                <Button
                  component='a'
                  href={expense.urlFile ? expense.urlFile : ''}
                  variant='plain'
                  startDecorator={<LinkIcon />}
                  target='_blank'
                  sx={{
                    color: colors.gold,
                    ':hover': { backgroundColor: colors.lighterGray },
                  }}
                >
                  Link
                </Button>
              ) : (
                ''
              )}
            </td>
            <td>
              <strong>{`\$ ${expense.totalAmount}`}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export { ExpensesTable };
