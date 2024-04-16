import EmployeeDummyComponent from '../../components/modules/Employees/Table';

const Employees = () => {
  return (
    <main className='p-10 py-4 flex gap-4'>
      <h1>Employees Page</h1>
      <EmployeeDummyComponent />
      <p>Welcome to the Employees page!</p>
    </main>
  );
};

export default Employees;
