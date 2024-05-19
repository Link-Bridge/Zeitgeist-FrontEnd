import dayjs, { Dayjs } from 'dayjs';
import { useReducer } from 'react';
import { TaskStatus } from '../types/task-status';

export type FormState = {
  title: string;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  status: TaskStatus;
  assignedEmployee: string | null;
  workedHours: number;
};

const initialFormState: FormState = {
  title: '',
  description: '',
  startDate: dayjs().startOf('day'),
  endDate: null,
  status: TaskStatus.NOT_STARTED,
  assignedEmployee: null,
  workedHours: 0,
};

type FormAction =
  | { type: 'CHANGE'; field: keyof FormState; value: string | Dayjs | TaskStatus | number | null }
  | { type: 'RESET'; state: FormState };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return action.state;
    default:
      return state;
  }
};

export default function useTaskForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const handleChange = (
    field: keyof FormState,
    value: string | Dayjs | TaskStatus | number | null
  ) => {
    dispatch({ type: 'CHANGE', field, value });
  };

  const setState = (state: FormState = initialFormState) => {
    dispatch({ type: 'RESET', state });
  };

  return { formState, changeField: handleChange, setState };
}
