import { Navigate, Route, Routes } from 'react-router-dom';
import ExpenseNew from './ExpenseNew';
import ExpenseDetails from './details';
import ExpensesMain from './main';

const Expenses = () => {
  return (
    <Routes>
      <Route path='/' element={<ExpensesMain />} />
      <Route path='/new' element={<ExpenseNew />} />
      <Route path='/details/:id' element={<ExpenseDetails />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Expenses;
