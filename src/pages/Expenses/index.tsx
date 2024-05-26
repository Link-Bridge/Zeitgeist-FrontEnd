import { Navigate, Route, Routes } from 'react-router-dom';
import ExpensesMain from './main';

const Expenses = () => {
  return (
    <Routes>
      <Route path='/' element={<ExpensesMain />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Expenses;
