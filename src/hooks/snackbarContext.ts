import { createContext } from 'react';

export interface SnackbarState {
  message: string;
  open: boolean;
  type?: 'danger' | 'success';
}

export interface SnackbarContext {
  state: SnackbarState;
  setState: (newState: SnackbarState) => void;
}

export const SnackbarContext = createContext<SnackbarContext>({
  state: { open: false, message: '' },
  setState: () => {},
});
