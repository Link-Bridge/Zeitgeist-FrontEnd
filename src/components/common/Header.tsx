import { useEffect, useState } from 'react';
import notification from '../../assets/icons/notifications.svg'
import { Avatar } from '@mui/joy';
import Colors from '../../colors'

interface HeaderProps {
  pageTitle: string;
}

const Header = ({pageTitle}:HeaderProps) => {
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const date = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    setCurrentDate(date.toLocaleDateString('en-US', dateOptions));
  }, [])
    
  return (
    <header className='flex flex-row flex-wrap justify-between items-center pl-[280px] pr-10 p-5'>
      <section>
        <h1 style={{color: Colors.gold,fontFamily:'Didot', fontSize: '2.8rem', lineHeight: '1.1'}}>{pageTitle}</h1>
        <p className='p-2'>{currentDate}</p>
      </section>
      
      <section className='flex flex-row align-items justify-between items-center g-10'>
        <button className='p-4'><img src={notification} alt="Notifications" /></button>
        <Avatar variant='solid'>OP</Avatar>
      </section>
    </header>
  );
};

export default Header;

