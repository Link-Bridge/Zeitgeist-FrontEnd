import { FolderShared, Home, SwitchAccount, Toc, ViewTimeline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import Colors from '../../colors';

const Items = [
  { icon: Home, href: '/', title: 'Home Page' },
  { icon: ViewTimeline, href: '/projects', title: 'Projects' },
  { icon: Toc, href: '/tasks', title: 'Tasks' },
  { icon: FolderShared, href: '/clients', title: 'Clients' },
  { icon: SwitchAccount, href: '/employees', title: 'Employees' },
];

const SideBar = () => {
  return (
    <aside className='fixed bg-[#424242] h-screen flex flex-col items-center pt-16 gap-10 w-[246px]'>
      <Link to={'/'}>
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
                className='flex items-center gap-5 px-[43px] py-5'
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
