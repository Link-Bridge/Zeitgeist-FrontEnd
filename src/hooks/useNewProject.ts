import axios from 'axios';
import { FormEvent, useReducer, useState } from 'react';

export interface FormState {
  projectName: string;
  client: string;
  category: string;
  matter: string;
  description: string;
  startDate: Date;
  endDate: Date;
  periodic: string;
  chargable: boolean;
}

const initialFormState: FormState = {
  projectName: '',
  client: '',
  category: '',
  matter: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  periodic: '',
  chargable: false,
};

type FormAction =
  | { type: 'CHANGE'; field: keyof FormState; value: string | Date | boolean }
  | { type: 'RESET'; initialState: FormState };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};

const useNewProject = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (field: keyof FormState, value: string | Date | boolean) => {
    dispatch({ type: 'CHANGE', field, value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/project', formState);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data.message || err.message));
      } else {
        setError(new Error('Unknown error ocurred'));
      }
    }
  };

  return { formState, handleChange, handleSubmit, error };
};

export default useNewProject;
