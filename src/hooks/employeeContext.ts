import { createContext } from 'react';

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

export type EmployeeBodyType = {
  employee: EmployeeDetails;
  role: string;
  department: string;
};

export type EmployeeContextType = {
  employee: EmployeeBodyType | null;
  setEmployee: (employee: EmployeeBodyType) => void;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  employee: null,
  setEmployee: () => {},
});
