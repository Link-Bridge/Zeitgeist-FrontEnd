import dayjs from 'dayjs';
import { ExpenseDraft, ExpenseRequest, InitialStateReimbursement } from '../types/expense';

/**
 * Action types for the expense reducer.
 */
export type ExpenseActions =
  | { type: 'toggle-modal' }
  | { type: 'update-reason'; payload: string }
  | { type: 'update-date'; payload: dayjs.Dayjs }
  | { type: 'add-expense' }
  | { type: 'remove-expense'; payload: number }
  | { type: 'update-expense'; payload: { index: number; field: string; value: any } }
  | { type: 'send-request'; payload: { report: ExpenseRequest } }
  | { type: 'restart-request' };

/**
 * State type for the expense reducer.
 */
export type ExpenseState = {
  modalOpen: boolean;
  reimbursementRequest: InitialStateReimbursement;
  reimbursementSkeleton: ExpenseDraft;
};

/**
 * Template for a new expense.
 */
export const reimbursementSkeleton: ExpenseDraft = {
  title: '',
  supplier: '',
  totalAmount: 0,
  date: null,
  urlFile: '',
};

/**
 * Initial state for the reimbursement request.
 */
const ReimbursementInitialState: InitialStateReimbursement = {
  title: '',
  startDate: null,
  expenses: [reimbursementSkeleton],
  status: 'Pending',
};

/**
 * Initial state for the expense reducer.
 */
export const InitialState: ExpenseState = {
  modalOpen: false,
  reimbursementRequest: ReimbursementInitialState,
  reimbursementSkeleton,
};

/**
 * Reducer function to manage the expense state based on dispatched actions.
 * @param state - The current state of the expense reducer.
 * @param action - The action to be processed.
 * @returns The updated state.
 */
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
          title: action.payload,
        },
      };
    case 'update-date':
      return {
        ...state,
        reimbursementRequest: {
          ...state.reimbursementRequest,
          startDate: action.payload,
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
        },
      };
    case 'send-request':
      return {
        ...state,
        modalOpen: false,
      };

    case 'restart-request':
      return {
        ...state,
        reimbursementRequest: ReimbursementInitialState,
        modalOpen: false,
      };

    default:
      return state;
  }
};
