import { FolderShared, Home, SwitchAccount, Toc, ViewTimeline } from '@mui/icons-material';
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
  return (
    <aside className="relative bg-[url('/src/assets/marmol.jpg')] bg-cover h-screen flex flex-col items-center w-[200px]">
      <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50'></div>
      <div className='relative z-10 flex flex-col items-center w-full'>
        <Link to={RoutesPath.HOME} className='w-full flex justify-center mt-16'>
          <img src={LogoZeitgeist} alt='Zeitgeist Logo' className='w-16 mb-10' />
        </Link>
        <nav className='w-full'>
          <ul className='w-full'>
            {Items.map(item => (
              <li
                key={item.href}
                className='first:mt-0 my-6 text-base hover:bg-darkestGray transition-all duration-400 font-semibold'
              >
                <Link
                  to={item.href}
                  className='flex items-center justify-center gap-3 px-9 py-5'
                  style={{ color: colors.lightGold }}
                >
                  <item.icon style={{ color: colors.lightGold }} />
                  <span>{item.title}</span>
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
