import { NotificationsNone } from '@mui/icons-material';
import { Avatar } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import Colors from '../../colors';
import { EmployeeContext } from '../../hooks/employeeContext';

interface HeaderProps {
  pageTitle: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
  const { employee: employeeContext } = useContext(EmployeeContext);
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const date = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    setCurrentDate(date.toLocaleDateString('en-US', dateOptions));
  }, []);

  return (
    <header className='flex flex-row flex-wrap justify-between items-start pt-6 basis-1/6'>
      <section>
        <p className='py-2 text-[#686868]'>{currentDate}</p>
        <h1
          style={{
            color: Colors.gold,
            fontFamily: 'Didot',
            fontSize: '3.5rem',
            lineHeight: '1.1',
            letterSpacing: '1.5px',
          }}
        >
          {pageTitle}
        </h1>
      </section>

      <section className='flex flex-row align-items justify-between items-center g-10 mt-3'>
        <button className='mx-8 text-[#C29A51]'>
          <NotificationsNone fontSize='large' />
        </button>
        <Avatar src={employeeContext?.employee.imageUrl} alt='User Profile'></Avatar>
      </section>
    </header>
  );
};

export default Header;
