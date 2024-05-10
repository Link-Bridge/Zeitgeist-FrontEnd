import { Card } from '@mui/joy';
import { useState } from 'react';
import SearchBar from '../../components/common/SearchBar';
import EmployeeTable from '../../components/modules/Employees/EmployeeeTable';

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  return (
    <section className='flex-1 overflow-scroll'>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
        placeholder='Search employees'
      />
      <Card className='flex-1'>
        <EmployeeTable searchTerm={searchTerm} />
      </Card>
    </section>
  );
};

export default Employees;
