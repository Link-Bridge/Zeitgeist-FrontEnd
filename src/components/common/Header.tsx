import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar } from '@mui/joy';
import dayjs from 'dayjs';
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
    setCurrentDate(dayjs().format('dddd, MMMM D, YYYY'));
  }, []);

  return (
    <header className='flex flex-row flex-wrap justify-between items-start pt-6 basis-1/6'>
      <section>
        <p className='py-2 text-[#686868]'>{currentDate}</p>
        <h1
          style={{
            color: Colors.gold,
            fontFamily: 'Didot',
            lineHeight: '1.1',
            letterSpacing: '1.5px',
          }}
          className='text-[30px] sm-text[40px]'
        >
          {pageTitle}
        </h1>
      </section>

      <section className='hidden md:flex justify-between items-center mt-3'>
        <a href='https://calendar.google.com/calendar/' className='mr-8' target='_blank'>
          <CalendarMonthIcon fontSize='large' className='text-[#C29A51]' />
        </a>
        {employeeContext?.employee.imageUrl ? (
          <Avatar
            src={employeeContext.employee.imageUrl}
            alt={employeeContext.employee.firstName}
          />
        ) : (
          <Avatar>
            {`${employeeContext?.employee.firstName[0]}${employeeContext?.employee.lastName[0]}`}
          </Avatar>
        )}
      </section>
    </header>
  );
};

export default Header;
