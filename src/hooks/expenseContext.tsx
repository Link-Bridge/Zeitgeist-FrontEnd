import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { ExpenseActions, ExpenseReducer, ExpenseState, InitialState } from './expense-reducer';

/**
 * Type definition for the properties of the ExpenseContext.
 */
type ExpenseContextProps = {
  state: ExpenseState;
  dispatch: Dispatch<ExpenseActions>;
};

/**
 * Type definition for the properties of the ExpenseProvider component.
 */
type ExpenseProviderProps = {
  children: ReactNode;
};

/**
 * Creating the context for managing expenses.
 */
export const ExpenseContext = createContext<ExpenseContextProps>({} as ExpenseContextProps);

/**
 * The provider component for the ExpenseContext.
 * @param children - The child components to be wrapped by the provider.
 * @returns The provider component with state and dispatch context.
 */
export const ExpenseProvider = ({ children }: ExpenseProviderProps) => {
  const [state, dispatch] = useReducer(ExpenseReducer, InitialState);
  return <ExpenseContext.Provider value={{ state, dispatch }}>{children}</ExpenseContext.Provider>;
};
