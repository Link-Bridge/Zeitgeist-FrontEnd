import { FolderShared, Home, SwitchAccount, Toc, ViewTimeline } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import colors from '../../colors';
import { RoutesPath } from '../../utils/constants';

const Items = [
  { icon: Home, href: RoutesPath.HOME, title: 'Home Page' },
  { icon: ViewTimeline, href: RoutesPath.PROJECTS, title: 'Projects' },
  { icon: Toc, href: RoutesPath.TASKS, title: 'Tasks' },
  { icon: FolderShared, href: RoutesPath.CLIENTS, title: 'Clients' },
  { icon: SwitchAccount, href: RoutesPath.EMPLOYEES, title: 'Employees' },
];

const SideBar = () => {
  const [activeItem, setActiveItem] = useState<RoutesPath>(RoutesPath.HOME);
  const handleItemClick = (href: string) => {
    setActiveItem(href as RoutesPath);
  };

  return (
    <aside className="relative bg-[url('/src/assets/marmol.jpg')] bg-cover h-screen top-0 left-0 flex flex-col items-center pt-16 gap-10 w-[200px]">
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
      <div className='relative z-10 w-full'>
        <div className='flex justify-center'>
          <Link to={RoutesPath.HOME}>
            <img src={LogoZeitgeist} alt='Zeitgeist Logo' className='w-16 mb-10' />
          </Link>
        </div>
        <nav className='w-full'>
          <ul className='w-full'>
            {Items.map(item => (
              <li
                key={item.href}
                className='first:mt-0 my-6 text-base hover:bg-darkestGray transition-all duration-400 font-semibold'
                onClick={() => handleItemClick(item.href)}
              >
                <Link
                  to={item.href}
                  className='flex items-center gap-3 px-9 py-5 opacity'
                  style={{
                    color: colors.lightGold,
                    opacity: activeItem === item.href ? 1 : 0.7,
                  }}
                >
                  <item.icon></item.icon>
                  <p>{item.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
