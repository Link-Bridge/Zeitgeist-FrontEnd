import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesPath } from '../../utils/constants';
import Header from './Header';
import SideBar from './SideBar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const pathToText = () => {
    if (location.pathname === RoutesPath.CLIENTS) return 'Clients';
    if (location.pathname === RoutesPath.PROJECTS) return 'Projects';
    if (location.pathname === RoutesPath.TASKS) return 'Tasks';
    if (location.pathname === RoutesPath.EMPLOYEES) return 'Employees';
    if (location.pathname === `${RoutesPath.PROJECTS}/new`) return 'New Project';
    if (location.pathname.startsWith(`${RoutesPath.PROJECTS}/report/`)) return 'Project Report';

    return 'Welcome Back';
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
