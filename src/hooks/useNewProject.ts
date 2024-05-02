import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useReducer, useState } from 'react';
import { ProjectPeriodicity } from '../types/project';
import { APIPath, EnvKeysValues } from '../utils/constants';

export interface FormState {
  projectName: string;
  client: string;
  category: string;
  matter: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  periodic: string;
  chargable: boolean;
  area: string;
}

const initialFormState: FormState = {
  projectName: '',
  client: '',
  category: '',
  matter: '',
  description: '',
  startDate: new Date(),
  endDate: null,
  periodic: ProjectPeriodicity.WHEN_NEEDED,
  chargable: false,
  area: '',
};

type FormAction =
  | { type: 'CHANGE'; field: keyof FormState; value: string | Date | boolean | null }
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

const valiateForm = (formState: FormState, setError: (arg0: Error) => void) => {
  if (!formState.projectName) {
    setError(new Error('Project name must not be empty'));
    return false;
  }
  if (!formState.client) {
    setError(new Error('Project client must not be empty'));
    return false;
  }
  if (!formState.category) {
    setError(new Error('Project category must not be empty'));
    return false;
  }
  if (!formState.area) {
    setError(new Error('Project area must not be empty'));
    return false;
  }
  if (formState.endDate && dayjs(formState.endDate).isBefore(formState.startDate)) {
    setError(new Error('End date must be after start date'));
    return false;
  }

  formState.area = formState.area.toUpperCase();

  return true;
};

const useNewProject = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [error, setError] = useState<Error | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof FormState, value: string | Date | boolean | null) => {
    dispatch({ type: 'CHANGE', field, value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!valiateForm(formState, setError)) return;

      setIsPosting(true);
      const idToken = sessionStorage.getItem('idToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.post(
        `${EnvKeysValues.BASE_API_URL}${APIPath.PROJECTS}/create`,
        {
          ...formState,
          status: '-',
        },
        {
          headers,
        }
      );
      if (res.status === 201) {
        setSuccess(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err);
        setError(new Error(err.message));
      } else {
        setError(new Error('Unknown error ocurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!valiateForm(formState, setError)) return;

      setIsPosting(true);
      console.log('updating...');
      // const res = await axios.post('http://localhost:4000/api/v1/project/create', {
      //   ...formState,
      //   status: '-',
      // });
      // if (res.status === 201) {
      //   setSuccess(true);
      // }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err);
        setError(new Error(err.message));
      } else {
        setError(new Error('Unknown error ocurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  return { formState, handleChange, handleSubmit, handleUpdate, error, isPosting, success };
};

export default useNewProject;
