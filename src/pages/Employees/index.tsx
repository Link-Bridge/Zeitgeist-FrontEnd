import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';
import EmployeeDummyComponent from '../../components/modules/Employees/Table';

const employees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'hey@gmail.com',
    phoneNumber: '123456789',
    department: 'accounting',
    role: 'employee',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'i@gmail.com',
    phoneNumber: '987654321',
    department: 'legal',
    role: 'employee',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'love@gmail.com',
    phoneNumber: '123456789',
    department: 'accounting',
    role: 'employee',
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'you@gmail.com',
    phoneNumber: '987654321',
    department: 'legal',
    role: 'employee',
  },
];

const Employees = () => {
  return (
    <main className='p-10 py-4 grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
      <h1 className='text-[34px] font-["Didot"]'>Employees Page</h1>
      <p>Welcome to the Employees page!</p>
      <EmployeeDummyComponent />
      <section className='bg-[#FAFAFA] rounded-xl p-10 lg:col-span-2 shadow-lg'>
        {employees.map(employee => (
          <EmployeeTable
            firstName={employee.firstName}
            lastName={employee.lastName}
            email={employee.email}
            role={employee.role}
          />
        ))}
      </section>
    </main>
  );
};

export default Employees;
