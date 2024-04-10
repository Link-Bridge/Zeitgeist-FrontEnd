import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const pathToText = () => {
    if (location.pathname === '/clients') return 'Clients';
    if (location.pathname === '/projects') return 'Projects';
    if (location.pathname === '/tasks') return 'Tasks';
    if (location.pathname === '/employees') return 'Employees';
    if (location.pathname === '/projects/new') return 'New Project';

    return 'Welcome Back';
  };

  return (
    <main className='w-screen h-screen flex'>
      <SideBar />
      <div className='flex flex-col h-full flex-1'>
        <Header pageTitle={pathToText()} />
        <section className='flex flex-col flex-1'>{children}</section>
      </div>
    </main>
  );
};

export default Layout;
