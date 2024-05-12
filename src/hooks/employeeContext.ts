import { createContext } from 'react';
import { EmployeeReponse } from '../types/employee';

export type EmployeeContextType = {
  employee: EmployeeReponse | null;
  setEmployee: (employee: EmployeeReponse) => void;
};

export const EmployeeContext = createContext<EmployeeContextType>({
  employee: null,
  setEmployee: () => {},
});
