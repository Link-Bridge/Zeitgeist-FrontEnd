import { NotificationsNone, Palette } from '@mui/icons-material';
import { Avatar } from '@mui/joy';
import { useEffect, useState } from 'react';
import Colors from '../../colors';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';

interface HeaderProps {
  pageTitle: string;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 0,
    backgroundColor: Colors.gold,
    padding: '0 4px',
  },
}));

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
    <header className='flex flex-row flex-wrap justify-between items-start pt-2 basis-1/6'>
      <section>
        <h1
          style={{
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

      <section className='flex flex-row align-items justify-between items-center g-10 mt-3 space-x-2'>
        <IconButton className='mx-8 text-[#C29A51]'>
          <StyledBadge badgeContent={326} style={{ color: 'white' }}>
            <NotificationsNone fontSize='large' style={{color: Colors.gold}}/>
          </StyledBadge>
        </IconButton>
        <Avatar variant='solid'>OP</Avatar>
      </section>
    </header>
  );
};

export default Header;
