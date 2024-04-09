import { useEffect, useState } from 'react';
import notifs from '../../assets/icons/notifications.svg'
import profile from '../../assets/icons/profile.png'

interface HeaderProps {
    pageTitle: string;
}

const Header = ({pageTitle}:HeaderProps) => {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const date = new Date();
        const dateOption = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
        setCurrentDate(date.toLocaleDateString('en-US', dateOption));
    }, [])
    
    return (
        <header className='flex flex-row justify-between items-center pl-[300px]'>
          <div >
            <h1 className='text-[#C29A51]'>{pageTitle}</h1>
            <p>{currentDate}</p>
          </div>
          <div className='flex flex-row justify-between items-center g-7 p-7'>
            <button className='bg-[#D9D9D9]'><img className= 'h-8 w-8' src={notifs} alt="Notifications" /></button>
            <img className='h-12 w-12' src={profile} alt="userPhoto"/>
          </div>
        </header>
        
      );
    };

export default Header;

