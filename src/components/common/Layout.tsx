import { ReactNode } from 'react';
import SideBar from './SideBar';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='flex flex-col'>
      <Header pageTitle='Welcome'/>
      <SideBar />
      <section className='flex-1 pl-[243px]'>{children}</section>
    </main>
  );
};

export default Layout;
