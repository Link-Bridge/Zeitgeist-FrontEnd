import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import { ExpenseReport } from '../../types/expense';
import { APIPath, RequestMethods } from '../../utils/constants';

const { id } = useParams();
const { data, loading, sendRequest, error } = useHttp<ExpenseReport>(
  `${APIPath.EXPENSE_REPORT}/${id}`,
  RequestMethods.GET
);

const ExpenseDetails = () => {
  return (
    <div>
      <h1>Expense Details</h1>
    </div>
  );
};

export default ExpenseDetails;
