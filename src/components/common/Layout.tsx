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
    switch (location.pathname) {
      case RoutesPath.CLIENTS:
        return 'Clients';
      case RoutesPath.PROJECTS:
        return 'Projects';
      case RoutesPath.TASKS:
        return 'Tasks';
      case RoutesPath.EMPLOYEES:
        return 'Employees';
      case `${RoutesPath.PROJECTS}/new`:
        return 'New Project';
      default:
        return `Welcome Back, ${employee?.employee.firstName}!`;
    }
  };

  return (
    <main className='w-screen h-screen flex'>
      <SideBar />
      <div className='flex flex-col h-full flex-1 px-14 pb-14'>
        <Header pageTitle={pathToText()} />
        <section className='flex flex-col flex-1 mt-3'>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
