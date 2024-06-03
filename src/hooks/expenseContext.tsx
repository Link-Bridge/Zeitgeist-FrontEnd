import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { ExpenseActions, ExpenseReducer, ExpenseState, InitialState } from './expense-reducer';

type ExpenseContextProps = {
  state: ExpenseState;
  dispatch: Dispatch<ExpenseActions>;
};

type ExpenseProviderProps = {
  children: ReactNode;
};

export const ExpenseContext = createContext<ExpenseContextProps>({} as ExpenseContextProps);

export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [state, dispatch] = useReducer(ExpenseReducer, InitialState);
  return <ExpenseContext.Provider value={{ state, dispatch }}>{children}</ExpenseContext.Provider>;
};
