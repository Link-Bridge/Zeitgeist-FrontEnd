import { ReactNode, createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesPath } from '../../utils/constants';
import Header from './Header';
import SideBar from './SideBar';

type LayoutProps = {
  children: ReactNode;
};

type EmployeeDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  idDepartment: string;
  idRole: string;
};

type EmployeeContextType = {
  employee: EmployeeDetails;
  role: string;
  department: string;
};

const UserContext = createContext<EmployeeContextType | null>(null);

const Layout = ({ children }: LayoutProps) => {
  const [employee, setEmployee] = useState<EmployeeContextType | null>(null);
  const location = useLocation();

  useEffect(() => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
      const parsedData: EmployeeContextType = JSON.parse(employeeData);
      setEmployee(parsedData);
    }
  }, []);

  const employeeName = employee ? employee.employee.firstName : 'Guest';

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
        return `Welcome Back, ${employeeName}!`;
    }
  };

  return (
    <UserContext.Provider value={employee}>
      <main className='w-screen h-screen flex'>
        <SideBar />
        <div className='flex flex-col h-full flex-1 px-14 pb-14'>
          <Header pageTitle={pathToText()} />
          <section className='flex flex-col flex-1 mt-3'>{children}</section>
        </div>
      </main>
    </UserContext.Provider>
  );
};

export default Layout;
