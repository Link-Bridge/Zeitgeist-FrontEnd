import dayjs, { Dayjs } from 'dayjs';
import { FormEvent, useContext, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios/axios';
import { ProjectAreas, ProjectEntity, ProjectPeriodicity, ProjectStatus } from '../types/project';
import { APIPath, BASE_API_URL, MAX_DATE, MIN_DATE } from '../utils/constants';
import { SnackbarContext } from './snackbarContext';

export type FormState = {
  name: string;
  idCompany: string;
  category: string;
  matter: string;
  description: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  periodicity: ProjectPeriodicity;
  isChargeable: boolean;
  area: ProjectAreas | null;
  status: ProjectStatus;
};

export type Fields = keyof FormState;
export type FormStateTypes = FormState[keyof FormState];

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  idCompany: '',
  category: '',
  matter: '',
  description: '',
  startDate: dayjs().startOf('day'),
  endDate: null,
  periodicity: ProjectPeriodicity.WHEN_NEEDED,
  isChargeable: false,
  area: null,
  status: ProjectStatus.NOT_STARTED,
};

type FormAction =
  | { type: 'CHANGE'; field: keyof FormState; value: FormStateTypes }
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

const validate = (formState: FormState) => {
  const errors: FormErrors = {};
  if (!formState.name.trim()) {
    errors.name = 'Project name is required';
  }

  if (formState.name.length > 70) {
    errors.name = 'Project name must be less than 70 characters';
  }

  if (!formState.idCompany) {
    errors.idCompany = 'Client is required';
  }

  if (formState.matter && formState.matter.length > 70) {
    errors.matter = 'Project matter must be less than 70 characters';
  }

  if (formState.description && formState.description.length > 255) {
    errors.description = 'Project description must be less than 256 characters';
  }

  if (!formState.category) {
    errors.category = 'Project category is required';
  }

  if (!formState.area) {
    errors.area = 'Project area is required';
  }

  if (!formState.startDate) {
    errors.startDate = 'Start date is required';
  }

  if (
    formState.startDate &&
    (isNaN(formState.startDate.day()) ||
      isNaN(formState.startDate.month()) ||
      isNaN(formState.startDate.year()))
  ) {
    errors.startDate = 'Invalid date';
  }

  if (
    formState.startDate &&
    !formState.startDate.isSame(MIN_DATE) &&
    formState.startDate.isBefore(MIN_DATE)
  )
    errors.startDate = 'Start date must be after 01/01/2018';

  if (formState.endDate) {
    if (formState.endDate.isBefore(formState.startDate)) {
      errors.startDate = 'Start date must be before end date';
    }

    if (
      isNaN(formState.endDate.day()) ||
      isNaN(formState.endDate.month()) ||
      isNaN(formState.endDate.year())
    ) {
      errors.endDate = 'Invalid date';
    }

    if (formState.endDate.isAfter(MAX_DATE))
      errors.endDate = `End date must be before ${MAX_DATE.format('DD/MM/YYYY')}`;
  }

  return errors;
};

const useProjectForm = () => {
  const navigate = useNavigate();
  const { setState: setSnackbar } = useContext(SnackbarContext);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [isPosting, setIsPosting] = useState(false);
  const [data, setData] = useState<ProjectEntity | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormState, value: FormStateTypes) => {
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    dispatch({ type: 'CHANGE', field, value });
  };

  const setState = (initialState: FormState) => {
    dispatch({ type: 'RESET', initialState });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validate(formState);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      setIsPosting(true);
      const payload = { ...formState };
      for (const key in payload) {
        if (typeof payload[key as Fields] === 'string') {
          (payload[key as Fields] as string | undefined) =
            (payload[key as Fields] as string).trim() || undefined;
        }
      }

      const res = await axiosInstance.post(`${BASE_API_URL}${APIPath.PROJECTS}/create`, {
        ...payload,
        status: ProjectStatus.NOT_STARTED,
      });
      setData(res.data);
      setSnackbar({ open: true, message: 'Project created successfully', type: 'success' });
      navigate(`/projects/details/${res.data.id}`, { replace: true });
    } catch (err: unknown) {
      setSnackbar({ open: true, message: 'Error creating project', type: 'danger' });
      console.log(err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleUpdate = async (e: FormEvent, id: string) => {
    e.preventDefault();
    const errors = validate(formState);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      setIsPosting(true);

      const payload = { ...formState };
      for (const key in payload) {
        if (typeof payload[key as Fields] === 'string') {
          (payload[key as Fields] as string | null) =
            (payload[key as Fields] as string).trim() || null;
        }
      }

      const res = await axiosInstance.put(`${BASE_API_URL}${APIPath.PROJECTS}/edit/${id}`, {
        ...payload,
      });
      setData(res.data);
      setSnackbar({ open: true, message: 'Project updated successfully', type: 'success' });
      navigate(`/projects/details/${id}`, { replace: true });
    } catch (err: unknown) {
      console.log(err);
      setSnackbar({ open: true, message: 'Error updating project', type: 'danger' });
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
    errors,
    isPosting,
    data,
  };
};

export default useProjectForm;
