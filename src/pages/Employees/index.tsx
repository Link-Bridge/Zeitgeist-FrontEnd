import { Card } from '@mui/joy';
import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';
//import EmployeeDummyComponent from '../../components/modules/Employees/Table';

const employees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'hey@gmail.com',
    phoneNumber: '123456789',
    department: 'accounting',
    role: 'employee',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    email: 'i@gmail.com',
    phoneNumber: '987654321',
    department: 'legal',
    role: 'employee',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    fullName: 'John Smith',
    email: 'love@gmail.com',
    phoneNumber: '123456789',
    department: 'accounting',
    role: 'employee',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'you@gmail.com',
    phoneNumber: '987654321',
    department: 'legal',
    role: 'employee',
    //imageUrl: 'https://media.istockphoto.com/id/1361394182/photo/funny-british-shorthair-cat-portrait-looking-shocked-or-surprised.jpg?b=1&s=612x612&w=0&k=20&c=-niqIUX8Kfiyn50xgUzxxUYX6H2q9BlGc3PX5PVM-iA='
  },
];

const Employees = () => {
  return (
    <Card className='flex-1'>
      <EmployeeTable employees={employees} />
    </Card>
  );
};

export default Employees;
