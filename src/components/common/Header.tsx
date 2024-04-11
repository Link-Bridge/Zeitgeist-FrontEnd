import { NotificationsNone } from '@mui/icons-material';
import { Avatar } from '@mui/joy';
import { useEffect, useState } from 'react';
import Colors from '../../colors';

interface HeaderProps {
  pageTitle: string;
}

const Header = ({ pageTitle }: HeaderProps) => {
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
    <header className='flex flex-row flex-wrap justify-between items-start pl-[280px] pr-10 p-5'>
      <section>
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
        <p className='py-2 text-[#686868]'>{currentDate}</p>
      </section>

      <section className='flex flex-row align-items justify-between items-center g-10 mt-3'>
        <button className='mx-8 text-[#C29A51]'>
          <NotificationsNone fontSize='large' />
        </button>
        <Avatar variant='solid'>OP</Avatar>
      </section>
    </header>
  );
};

export default Header;
