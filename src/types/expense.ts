export enum ExpenseReportStatus {
  ACCEPTED = 'Accepted',
  PAYED = 'Payed',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
}

/**
 * This class is used to define the structure of the Expense Entity
 *
 * @param id: string - Unique identifier of the expense
 * @param title: string - Expense title
 * @param justification: string - Expense justification
 * @param supplier?: string - Expense supplier (optional)
 * @param totalAmount: number - Expense amount
 * @param status?: string - Expense status (optional)
 * @param category?: string - Expense category (optional)
 * @param date: Date - Expense date
 * @param createdAt: Date - Expense creation date
 * @param updatedAt?: Date - Expense update date (optional)
 * @param idReport: string - Unique identifier of expense report associated
 * @param urlFile?: string - URL of the file associated with the expense (optional)
 */

export type ExpenseEntity = {
  id: string;
  title: string;
  justification: string;
  supplier?: string | null;
  totalAmount: number;
  status?: string | null;
  category?: string | null;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  idReport: string;
  urlFile?: string | null;
};

export type ExpenseDraft = Pick<
  ExpenseEntity,
  'title' | 'totalAmount' | 'supplier' | 'date' | 'urlFile'
>;

/**
 * This class is used to define the structure of the ExpenseReport Entity
 *
 * @param id: string - Unique identifier of the expense report
 * @param title: string - Expense Report title
 * @param description: string - Expense Report description
 * @param startDate: Date - Expense Report start date
 * @param endDate?: Date - Expense Report end date (optional)
 * @param status?: string - Expense Report status (optional)
 * @param createdAt?: Date - Expense Report creation date (optional)
 * @param updatedAt?: Date - Expense Report update date (optional)
 * @param urlVoucher?: string - URL of the voucher associated with the report (optional)
 * @param idEmployee: string - Unique identifier of the employee associated
 * @param employeeFirstName?: string - Employee first name (optional)
 * @param employeeLastName?: string - Employee last name (optional)
 * @param expenses?: ExpenseEntity[] - Array of expenses associated with the report (optional)
 * @param totalAmount?: Decimal - Total amount of the expenses associated with the report (optional)
 *
 */

export interface ExpenseReport {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date | null;
  status?: ExpenseReportStatus;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  urlVoucher?: string | null;
  idEmployee: string;
  employeeFirstName?: string;
  employeeLastName?: string;
  expenses?: ExpenseEntity[];
  totalAmount?: number | null;
}

export type InitialStateReimbursement = {
  reason: string;
  date: Date;
  expenses: ExpenseDraft[];
  total: number;
};
