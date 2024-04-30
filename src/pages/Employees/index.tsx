import { Card } from '@mui/joy';
import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';

const Employees = () => {
  return (
    <section className='flex-1 overflow-scroll'>
      <Card className='flex-1'>
        <EmployeeTable />
      </Card>
    </section>
  );
};

export default Employees;
