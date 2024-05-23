import { AxiosRequestConfig } from 'axios';
import { Dayjs } from 'dayjs';
import { FormEvent, useContext, useReducer, useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { APIPath, BASE_API_URL } from '../utils/constants';
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

const initialFormState: FormState = {
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

/*
const phoneNumberMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};
*/

const validate = (formState: FormState) => {
  const errors: FormErrors = {};

  if (!formState.name.trim()) errors.name = 'Name is required';

  if (formState.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
    errors.email = 'Invalid email format';

  if (formState.phoneNumber.trim() && formState.phoneNumber.trim().length < 12)
    errors.phoneNumber = 'Invalid phone number';

  if (formState.rfc.trim() && !/^[a-zA-Z]{3,4}[0-9]{6}[a-zA-Z0-9]{3}$/.test(formState.rfc))
    errors.rfc = 'Invalid RFC';

  if (
    formState.constitutionDate &&
    (isNaN(formState.constitutionDate.day()) ||
      isNaN(formState.constitutionDate.month()) ||
      isNaN(formState.constitutionDate.year()))
  )
    errors.constitutionDate = 'Invalid date';

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

      console.log(payload);
      const baseUrl = `${BASE_API_URL}${APIPath.COMPANIES}`;
      const config: AxiosRequestConfig = {
        url: update ? `${baseUrl}/${id}` : `${baseUrl}/new`,
        method: update ? 'PUT' : 'POST',
        data: payload,
      };
      const res = await axiosInstance(config);
      setSnackbar({ open: true, message: 'Client created successfully', type: 'success' });
      return res.data;
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: 'Error creating client', type: 'danger' });
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  return { formState, handleChange, setState, isPosting, handleSubmit, errors };
};

export default useClientForm;
