import axios from 'axios';
import dayjs from 'dayjs';
import { FormEvent, useReducer, useState } from 'react';
import { ProjectPeriodicity, ProjectStatus } from '../types/project';
import { APIPath, BASE_API_URL } from '../utils/constants';

export interface FormState {
  id?: string;
  name: string;
  idCompany: string;
  category: string;
  matter: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  periodicity: string;
  isChargeable: boolean;
  area: string;
  status?: string;
}

const initialFormState: FormState = {
  id: '',
  name: '',
  idCompany: '',
  category: '',
  matter: '',
  description: '',
  startDate: new Date(),
  endDate: null,
  periodicity: ProjectPeriodicity.WHEN_NEEDED,
  isChargeable: false,
  area: '',
  status: '',
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

const validateForm = (formState: FormState, setError: (arg0: Error) => void) => {
  if (!formState.name) {
    setError(new Error('Project name must not be empty'));
    return false;
  } else if (formState.name.length > 70) {
    setError(new Error('Project name must be less than 70 characters'));
    return false;
  }
  if (formState.matter && formState.matter.length > 70) {
    setError(new Error('Project matter must be less than 70 characters'));
    return false;
  }
  if (formState.description && formState.description.length > 255) {
    setError(new Error('Project description must be less than 255 characters'));
    return false;
  }
  if (!formState.idCompany) {
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
  if (!formState.startDate) {
    setError(new Error('Start date is required'));
    return false;
  }
  if (formState.endDate && dayjs(formState.endDate).isBefore(formState.startDate)) {
    setError(new Error('End date must be after start date'));
    return false;
  }

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

  const setState = (initialState: FormState) => {
    dispatch({ type: 'RESET', initialState });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!validateForm(formState, setError)) return;

      setIsPosting(true);
      const idToken = localStorage.getItem('idToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.post(
        `${BASE_API_URL}${APIPath.PROJECTS}/create`,
        {
          ...formState,
          status: ProjectStatus.NOT_STARTED,
        },
        {
          headers,
        }
      );
      if (res.status === 201) {
        setSuccess(true);
      }
    } catch (err: unknown) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        console.error(err);
        if (err.response?.data.message) setError(new Error(err.response?.data.message));
        else setError(new Error(err.message));
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
      if (!validateForm(formState, setError)) return;

      setIsPosting(true);
      const idToken = localStorage.getItem('idToken');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      };
      const res = await axios.put(
        `${BASE_API_URL}${APIPath.PROJECTS}/edit/${formState.id}`,
        {
          ...formState,
        },
        {
          headers,
        }
      );
      if (res.status === 200) {
        setSuccess(true);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data.message) setError(new Error(err.response?.data.message));
        else setError(new Error(err.message));
      } else {
        setError(new Error('Unknown error ocurred'));
      }
    } finally {
      setIsPosting(false);
    }
  };

  return {
    formState,
    handleChange,
    setState,
    handleSubmit,
    handleUpdate,
    error,
    isPosting,
    success,
  };
};

export default useNewProject;
