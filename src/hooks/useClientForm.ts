import { AxiosError, AxiosRequestConfig } from 'axios';
import { Dayjs } from 'dayjs';
import { FormEvent, useContext, useReducer, useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { APIPath, BASE_API_URL, CLIENT_MIN_DATE, MAX_DATE } from '../utils/constants';
import { SnackbarContext } from './snackbarContext';

export type FormState = {
  name: string;
  email: string;
  phoneNumber: string;
  rfc: string;
  constitutionDate: Dayjs | null;
  taxResidence: string;
};

export type Fields = keyof FormState;
export type FormStateTypes = FormState[keyof FormState];

type FormErrors = Partial<Record<keyof FormState, string>>;

export const initialFormState: FormState = {
  name: '',
  email: '',
  phoneNumber: '',
  rfc: '',
  constitutionDate: null,
  taxResidence: '',
};

type FormAction =
  | { type: 'CHANGE'; field: keyof FormState; value: FormStateTypes }
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

const validate = (formState: FormState) => {
  const errors: FormErrors = {};

  if (!formState.name.trim()) errors.name = 'Name is required';

  if (
    formState.email.trim() &&
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      formState.email
    )
  )
    errors.email = 'Invalid email format';

  if (formState.phoneNumber.trim() && formState.phoneNumber.trim().length < 12)
    errors.phoneNumber = 'Invalid phone number';

  if (formState.rfc.trim() && !/^[a-zA-Z]{3,4}[0-9]{6}[a-zA-Z0-9]{3}$/.test(formState.rfc))
    errors.rfc = 'Invalid RFC';

  if (
    formState.constitutionDate &&
    (isNaN(formState.constitutionDate.$D) ||
      isNaN(formState.constitutionDate.$M) ||
      isNaN(formState.constitutionDate.$y))
  )
    errors.constitutionDate = 'Invalid date';

  if (formState.constitutionDate && formState.constitutionDate.isBefore(CLIENT_MIN_DATE))
    errors.constitutionDate = `Constitution date must be after ${CLIENT_MIN_DATE.format('DD/MM/YYYY')}`;

  if (formState.constitutionDate && formState.constitutionDate.isAfter(MAX_DATE))
    errors.constitutionDate = `Constitution date must be before ${MAX_DATE.format('DD/MM/YYYY')}`;

  return errors;
};

const useClientForm = () => {
  const { setState: setSnackbar } = useContext(SnackbarContext);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPosting, setIsPosting] = useState(false);

  const handleChange = (field: Fields, value: FormStateTypes) => {
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    dispatch({ type: 'CHANGE', field, value });
  };

  const setState = (state: FormState) => {
    dispatch({ type: 'RESET', state });
  };

  const handleSubmit = async (e: FormEvent, update = false, id = '') => {
    e.preventDefault();
    const errors = validate(formState);
    setErrors(errors);
    if (Object.keys(errors).length > 0) throw 'Invalid form';

    try {
      setIsPosting(true);
      const payload = { ...formState };
      payload.rfc = payload.rfc.toUpperCase();
      payload.phoneNumber = payload.phoneNumber.replace(/\D/g, '');
      for (const key in payload) {
        if (typeof payload[key as Fields] === 'string') {
          (payload[key as Fields] as string | undefined) =
            (payload[key as Fields] as string).trim() || undefined;
        }
      }

      const baseUrl = `${BASE_API_URL}${APIPath.COMPANIES}`;
      const config: AxiosRequestConfig = {
        url: update ? `${baseUrl}/${id}` : `${baseUrl}/new`,
        method: update ? 'PUT' : 'POST',
        data: payload,
      };
      const res = await axiosInstance(config);
      setSnackbar({
        open: true,
        message: `Client ${update ? 'updated' : 'created'} successfully`,
        type: 'success',
      });
      return res.data;
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError)
        setSnackbar({ open: true, message: error.response?.data.error, type: 'danger' });
      else
        setSnackbar({
          open: true,
          message: `Error ${update ? 'updating' : 'creating'} client`,
          type: 'danger',
        });
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  return { formState, handleChange, setState, isPosting, handleSubmit, errors };
};

export default useClientForm;
