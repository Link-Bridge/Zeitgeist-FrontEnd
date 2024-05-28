import dayjs from 'dayjs';
import { ExpenseDraft, InitialStateReimbursement } from '../types/expense';

export type ExpenseActions =
  | { type: 'toggle-modal' }
  | { type: 'update-reason'; payload: string }
  | { type: 'update-date'; payload: dayjs.Dayjs }
  | { type: 'add-expense' }
  | { type: 'remove-expense'; payload: number }
  | { type: 'update-expense'; payload: { index: number; field: string; value: any } };

export type ExpenseState = {
  modalOpen: boolean;
  reimbursementRequest: InitialStateReimbursement;
  reimbursementSkeleton: ExpenseDraft;
};

export const reimbursementSkeleton: ExpenseDraft = {
  title: '',
  totalAmount: 0,
  supplier: '',
  date: null,
  urlFile: '',
};

const ReimbursementInitialState: InitialStateReimbursement = {
  reason: '',
  date: null,
  expenses: [reimbursementSkeleton],
  total: 0,
};

export const InitialState: ExpenseState = {
  modalOpen: false,
  reimbursementRequest: ReimbursementInitialState,
  reimbursementSkeleton,
};

export const ExpenseReducer = (
  state: ExpenseState = InitialState,
  action: ExpenseActions
): ExpenseState => {
  switch (action.type) {
    case 'toggle-modal':
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    case 'update-reason':
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          reason: action.payload,
        },
      };
    case 'update-date':
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          date: action.payload,
        },
      };
    case 'add-expense':
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          expenses: [...state.reimbursementRequest.expenses, reimbursementSkeleton],
        },
      };
    case 'remove-expense':
      const updatedExpenses = state.reimbursementRequest.expenses.filter(
        (_, i) => i !== action.payload
      );
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          expenses: updatedExpenses,
          total: updatedExpenses.reduce((total, expense) => total + expense.totalAmount, 0),
        },
      };
    case 'update-expense':
      const updatedExpenseList = state.reimbursementRequest.expenses.map((expense, i) =>
        i === action.payload.index
          ? { ...expense, [action.payload.field]: action.payload.value }
          : expense
      );
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          expenses: updatedExpenseList,
          total: updatedExpenseList.reduce((total, expense) => total + expense.totalAmount, 0),
        },
      };
    default:
      return state;
  }
};
