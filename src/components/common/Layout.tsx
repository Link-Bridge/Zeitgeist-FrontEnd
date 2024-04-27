import { ReactNode, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { EmployeeContext } from '../../hooks/employeeContext';
import { RoutesPath } from '../../utils/constants';
import Header from './Header';
import SideBar from './SideBar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const { employee } = useContext(EmployeeContext);

  const pathToText = () => {
    if (location.pathname === RoutesPath.CLIENTS) return 'Clients';
    if (location.pathname === RoutesPath.PROJECTS) return 'Projects';
    if (location.pathname === RoutesPath.TASKS) return 'Tasks';
    if (location.pathname.startsWith(`${RoutesPath.TASKS}/`)) return 'Task Detail';
    if (location.pathname === RoutesPath.EMPLOYEES) return 'Employees';
    if (location.pathname === `${RoutesPath.PROJECTS}/new`) return 'New Project';
    if (location.pathname.startsWith(`${RoutesPath.PROJECTS}/report/`)) return 'Project Report';

    return `Welcome Back, ${employee?.employee.firstName}!`;
  };

  return (
    <main className='w-screen h-screen flex'>
      <SideBar />
      <div className='flex flex-col h-full flex-1 px-14 pb-14'>
        <Header pageTitle={pathToText()} />
        <section className='flex flex-col flex-1 mt-3 min-h-0'>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
