import { Navigate, Route, Routes } from 'react-router-dom';
import { ExpenseProvider } from '../../hooks/expenseContext';
import ExpenseDetails from './details';
import ExpensesMain from './main';
import ExpenseNew from './new';

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
