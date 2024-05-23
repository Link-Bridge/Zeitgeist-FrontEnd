import { Navigate, Route, Routes } from 'react-router-dom';
import ExpenseDetails from './details';

const Expenses = () => {
  return (
    <Routes>
      <Route path='/details/:id' element={<ExpenseDetails />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Expenses;
