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

    return 'Welcome Back';
  };

  return (
    <main className='flex flex-col h-screen'>
      <Header pageTitle={pathToText()} />
      <SideBar />
      <section className='flex-1 pl-[243px]'>{children}</section>
    </main>
  );
};

export default Layout;
