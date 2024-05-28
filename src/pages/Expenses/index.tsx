import { Navigate, Route, Routes } from 'react-router-dom';
import { ExpenseProvider } from '../../hooks/expenseContext';
import ExpenseNew from './ExpenseNew';
import ExpenseDetails from './details';
import ExpensesMain from './main';

const Expenses = () => {
  return (
    <ExpenseProvider>
      <Routes>
        <Route path='/' element={<ExpensesMain />} />
        <Route path='/new' element={<ExpenseNew />} />
        <Route path='/details/:id' element={<ExpenseDetails />} />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </ExpenseProvider>
  );
};

export default Expenses;
