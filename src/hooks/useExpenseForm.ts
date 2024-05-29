import { useContext, useReducer, useState } from 'react';
import { axiosInstance } from '../lib/axios/axios';
import { ExpenseReport } from '../types/expense';
import { APIPath, BASE_API_URL } from '../utils/constants';
import { SnackbarContext } from './snackbarContext';

export type FormState = {
  id: string | null;
  urlVoucher: string;
};

export type Fields = keyof FormState;
export type FormStateTypes = FormState[keyof FormState];

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  id: '',
  urlVoucher: '',
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
  const urlVoucher = formState.urlVoucher.trim();
  const googleDriveLinkRegEx = /^https:\/\/drive\.google\.com\/.*$/;

  if (!urlVoucher) errors.urlVoucher = 'Voucher URL is required';
  else if (!googleDriveLinkRegEx.exec(urlVoucher))
    errors.urlVoucher = 'Voucher URL must be a Google Drive link (drive.google.com)';

  return errors;
};

const useExpenseForm = () => {
  const { setState: setSnackbar } = useContext(SnackbarContext);

  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [isPosting, setIsPosting] = useState(false);
  const [data, setData] = useState<ExpenseReport | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormState, value: FormStateTypes) => {
    if (errors[field]) setErrors({ ...errors, [field]: '' });
    dispatch({ type: 'CHANGE', field, value });
  };

  const setState = (initialState: FormState) => {
    dispatch({ type: 'RESET', initialState });
  };

  const handleUpdate = async (
    id: string,
    confirmation: boolean,
    setOpenModal: (val: boolean) => {}
  ) => {
    const errors = validate(formState);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!confirmation) return setOpenModal(true);

    try {
      setIsPosting(true);
      const payload = { ...formState };
      for (const key in payload) {
        if (typeof payload[key as Fields] === 'string') {
          (payload[key as Fields] as string | undefined) =
            (payload[key as Fields] as string).trim() || undefined;
        }
      }

      const res = await axiosInstance.put(
        `${BASE_API_URL}${APIPath.EXPENSE_REPORT}/payment/${id}`,
        {
          urlVoucher: payload.urlVoucher,
        }
      );
      setData(res.data);
      setSnackbar({ open: true, message: 'Voucher URL updated successfully', type: 'success' });
    } catch (err: unknown) {
      setSnackbar({ open: true, message: 'Error updating voucher URL', type: 'danger' });
      console.log(err);
    } finally {
      setIsPosting(false);
    }
  };

  return {
    formState,
    handleChange,
    setState,
    handleUpdate,
    errors,
    isPosting,
    data,
  };
};

export default useExpenseForm;
