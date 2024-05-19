import dayjs, { Dayjs } from 'dayjs';
import { useContext, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios/axios';
import { TaskStatus } from '../types/task-status';
import { BASE_API_URL } from '../utils/constants';
import { SnackbarContext } from './snackbarContext';

export type FormState = {
  title: string;
  description: string;
  startDate: Dayjs;
  endDate: Dayjs | null;
  status: TaskStatus;
  idEmployee: string | null;
  workedHours: number;
};

export type Fields = keyof FormState;

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  title: '',
  description: '',
  startDate: dayjs().startOf('day'),
  endDate: null,
  status: TaskStatus.NOT_STARTED,
  idEmployee: null,
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

function validate(formState: FormState) {
  const errors: FormErrors = {};

  if (formState.title.trim() === '') {
    errors.title = 'Title is required';
  }

  if (formState.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!formState.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (!formState.status) {
    errors.status = 'Status is required';
  }

  if (formState.endDate && formState.startDate.isAfter(formState.endDate)) {
    errors.startDate = 'Start date must be before end date';
  }

  return errors;
}

export default function useTaskForm(idProject: string) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setState: setSnackbar } = useContext(SnackbarContext);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [res, setRes] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (
    field: keyof FormState,
    value: string | Dayjs | TaskStatus | number | null
  ) => {
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    dispatch({ type: 'CHANGE', field, value });
  };

  const setState = (state: FormState = initialFormState) => {
    dispatch({ type: 'RESET', state });
  };

  const handleSubmit = async () => {
    const errors = validate(formState);
    setErrors(errors);
    console.log(formState);
    if (Object.keys(errors).length) return;

    try {
      const res = await axiosInstance.post(`${BASE_API_URL}/tasks/create`, {
        ...formState,
        idProject,
      });
      setRes(res.data);
      setSnackbar({ open: true, message: 'Task created successfully', type: 'success' });
      navigate(`/tasks/${res.data.id}`, { state: location.state, replace: true });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error creating task', type: 'danger' });
      if (error instanceof Error) setError(error);
    }
  };

  return { formState, handleChange, setState, error, errors, res, handleSubmit };
}
