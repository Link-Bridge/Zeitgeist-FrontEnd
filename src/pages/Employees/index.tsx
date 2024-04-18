import { Card } from '@mui/joy';
import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';
//import EmployeeDummyComponent from '../../components/modules/Employees/Table';



const Employees = () => {
  return (
    <Card className='flex-1'>
      <EmployeeTable employees={employees} />
    </Card>
  );
};

export default Employees;
