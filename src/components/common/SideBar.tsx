import {
  FolderShared,
  Home,
  Logout,
  MenuRounded,
  SwitchAccount,
  Toc,
  ViewTimeline,
} from '@mui/icons-material';
import { Drawer, IconButton, ModalClose } from '@mui/joy';
import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import colors from '../../colors';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import { axiosInstance } from '../../lib/axios/axios';
import { BASE_API_URL, RoutesPath } from '../../utils/constants';

const SideBar = () => {
  const { employee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);
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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('deviceToken');
      if (token) {
        await axiosInstance.post(`${BASE_API_URL}/notification/revoke-token`, {
          deviceToken: token,
        });
      }
    } catch (error) {
      console.error('Error revoking token:', error);
    }

    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('employee');
    localStorage.removeItem('deviceToken');

    setState({ open: true, message: 'Logged out successfully', type: 'success' });
  };

  const SideBarContent = () => (
    <aside
      className={`relative bg-[url('/src/assets/marmol.jpg')] bg-repeat top-0 left-0 md:flex flex-col items-center pt-16 gap-10 w-full h-full overflow-y-auto`}
    >
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
      <div className='relative z-10 w-full flex flex-col justify-between h-full'>
        <div>
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
                >
                  <Link
                    to={item.href}
                    className='flex items-center gap-3 px-9 py-5 opacity'
                    style={{
                      color: colors.lightGold,
                      opacity: pathname.includes(item.href) ? 1 : 0.7,
                    }}
                  >
                    <item.icon />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className='w-full'>
          <nav className='w-full'>
            <ul className='w-full'>
              <li className='first:mt-0 my-6 text-base hover:bg-darkestGray transition-all duration-400 font-semibold'>
                <button
                  onClick={handleLogout}
                  className='flex items-center gap-3 px-9 py-5 opacity'
                  style={{
                    color: colors.lightGold,
                    opacity: 0.7,
                  }}
                >
                  <Logout />
                  <p>Log Out</p>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );

  return (
    <div className='flex h-screen'>
      <div className='md:hidden fixed top-7 left-3 z-50'>
        <IconButton onClick={toggleSidebar}>
          <MenuRounded />
        </IconButton>
      </div>
      <div className='hidden md:block w-72'>
        <SideBarContent />
      </div>
      <div className='min-h-screen h-full'>
        <Drawer size={'md'} open={isSidebarOpen} onClose={toggleSidebar}>
          <ModalClose size='lg' sx={{ '&:hover': { bgcolor: 'transparent', color: 'white' } }} />
          <SideBarContent />
        </Drawer>
      </div>
    </div>
  );
};

export default SideBar;
