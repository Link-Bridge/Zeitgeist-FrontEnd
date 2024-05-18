import {
  FolderShared,
  Home,
  MenuRounded,
  SwitchAccount,
  Toc,
  ViewTimeline,
} from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/joy';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import colors from '../../colors';
import { EmployeeContext } from '../../hooks/employeeContext';
import { RoutesPath } from '../../utils/constants';

const SideBar = () => {
  const { employee } = useContext(EmployeeContext);
  const pathname = useLocation().pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdmin = employee?.role === 'Admin';

  const Items = [
    { icon: Home, href: RoutesPath.HOME, title: 'Home Page' },
    { icon: ViewTimeline, href: RoutesPath.PROJECTS, title: 'Projects' },
    { icon: Toc, href: RoutesPath.TASKS, title: 'Tasks' },
    { icon: FolderShared, href: RoutesPath.CLIENTS, title: 'Clients' },
    ...(isAdmin ? [{ icon: SwitchAccount, href: RoutesPath.EMPLOYEES, title: 'Employees' }] : []),
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const SideBarContent = () => (
    <aside
      className={`relative bg-[url('/src/assets/marmol.jpg')] bg-cover h-screen top-0 left-0 md:flex flex-col items-center pt-16 gap-10 w-80`}
    >
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
                className='first:mt-0 my-6 text-base hover:bg-darkestGray transition-all duration-400 font-semibold
              '
              >
                <Link
                  to={item.href}
                  className='flex items-center gap-3 px-9 py-5 opacity'
                  style={{
                    color: colors.lightGold,
                    opacity: pathname.includes(item.href) ? 1 : 0.7,
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

  return (
    <div className='flex h-screen'>
      <div className='md:hidden fixed top-7 left-5 z-50'>
        <IconButton onClick={toggleSidebar}>
          <MenuRounded />
        </IconButton>
      </div>
      <div className='hidden md:block'>
        <SideBarContent />
      </div>
      <div className='md:hidden'>
        <Drawer open={isSidebarOpen} onClose={toggleSidebar}>
          <SideBarContent />
        </Drawer>
      </div>
    </div>
  );
};

export default SideBar;
