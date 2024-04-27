import { NotificationsNone } from '@mui/icons-material';
import { Avatar } from '@mui/joy';
import { useEffect, useState } from 'react';
import Colors from '../../colors';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface HeaderProps {
  pageTitle: string;
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  '& .MuiBadge-badge': {
    right: -2,
    top: 0,
    backgroundColor: Colors.gold,
    padding: '0 4px',
  },
}));

const TempOptions = [
  'Notification01',
  'Notification02',
  'Notification03',
  'Notification04',
  'Notification05',
  'Notification06',
];

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <IconButton className='mx-8 text-[#C29A51]' onClick={handleClick}>
          <StyledBadge badgeContent={326} style={{ color: 'white' }}>
            <NotificationsNone fontSize='large' style={{color: Colors.gold}}/>
          </StyledBadge>
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: '15ch',
              width: '40ch',
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {TempOptions.map((option) => (
            <MenuItem key={option} onClick={handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Avatar variant='solid'>OP</Avatar>
      </section>
    </header>
  );
};

export default Header;
