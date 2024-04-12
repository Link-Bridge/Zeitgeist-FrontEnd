import { FolderShared, Home, SwitchAccount, Toc, ViewTimeline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import Colors from '../../colors';
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
    <aside className='bg-[#424242] h-screen flex flex-col items-center pt-16 gap-10 w-[200px]'>
      <Link to={RoutesPath.HOME}>
        <img src={LogoZeitgeist} alt='Zeitgeist Logo' className='w-16 mb-10' />
      </Link>
      <nav className='w-full flex justify-center'>
        <ul className='w-full'>
          {Items.map(item => (
            <li
              key={item.href}
              className='first:mt-0 my-6 text-base hover:bg-[#313131] transition-all duration-400 font-semibold'
            >
              <Link
                to={item.href}
                className='flex items-center gap-3 px-9 py-5'
                style={{ color: Colors.lightGold }}
              >
                <item.icon />
                <p>{item.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
