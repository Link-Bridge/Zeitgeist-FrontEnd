import { Card } from '@mui/joy';
import { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';
import { EmployeeOptions } from './employee-options.eum';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const selectedOptions = [EmployeeOptions.Name, EmployeeOptions.Email, EmployeeOptions.Role];

  return (
    <section className='flex-1 overflow-scroll'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        options={[EmployeeOptions.Name, EmployeeOptions.Email, EmployeeOptions.Role]}
        placeholder='Search employees'
      />
      <Card className='flex-1'>
        <EmployeeTable searchTerm={searchTerm} selectedOptions={selectedOptions} />
      </Card>
    </section>
  );
};

export default Employees;
