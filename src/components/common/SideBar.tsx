import { Link } from 'react-router-dom';
import LogoZeitgeist from '../../assets/icons/LOGO_Zeitgeist.svg';
import ClientsIcon from '../../assets/icons/folder_shared.svg';
import EmployeesIcon from '../../assets/icons/groups_black.svg';
import HomeIcon from '../../assets/icons/homeIcon.svg';
import TasksIcon from '../../assets/icons/list.svg';
import ProjectsIcon from '../../assets/icons/view_module.svg';
import Colors from '../../colors';
import { RoutesPath } from '../../utils/constants';

const Items = [
  { icon: HomeIcon, href: RoutesPath.HOME, title: 'Home Page' },
  { icon: ProjectsIcon, href: RoutesPath.PROJECTS, title: 'Projects' },
  { icon: TasksIcon, href: RoutesPath.TASKS, title: 'Tasks' },
  { icon: ClientsIcon, href: RoutesPath.CLIENTS, title: 'Clients' },
  { icon: EmployeesIcon, href: RoutesPath.EMPLOYEES, title: 'Employees' },
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
                <img src={item.icon} alt={item.title} />
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
