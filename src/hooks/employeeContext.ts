import { createContext } from 'react';
import { EmployeeEntity } from '../types/employee';

export type EmployeeBodyType = {
  employee: EmployeeEntity;
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
