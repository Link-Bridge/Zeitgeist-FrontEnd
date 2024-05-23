export enum ExpenseReportStatus {
  ACCEPTED = 'Accepted',
  PAYED = 'Payed',
  PENDING = 'Pending',
  REJECTED = 'Rejected',
  NONE = '-',
}

/**
 * This class is used to define the structure of the Expense entity
 *
 * @remarks
 * This class is used to define the structure of the Expense entity
 *
 * @param id: string - Unique identifier of the expense
 * @param title: string - Expense title
 * @param justification: string - Expense justification
 * @param totalAmount: number - Expense amount
 * @param status?: string - Expense status (optional)
 * @param category?: string - Expense category (optional)
 * @param date: Date - Expense date
 * @param createdAt: Date - Expense creation date
 * @param updatedAt?: Date - Expense update date (optional)
 * @param idReport: string - Unique identifier of expense report associated
 * @param urlFile?: string - URL of the file associated with the expense (optional)
 * @returns void
 */

export interface ExpenseEntity {
  id: string;
  title: string;
  justification: string;
  totalAmount: number;
  status?: string | null;
  category?: string | null;
  date: Date;
  createdAt: Date;
  updatedAt?: Date | null;
  idReport: string;
  urlFile?: string | null;
}

/**
 * @brief This class is used to define the structure of the Expense Report entity
 *
 * @param id: string - Unique identifier of the expense report
 * @param title: string - Expense Report title
 * @param description: string - Expense Report description
 * @param startDate: Date - Expense Report start date
 * @param endDate?: Date - Expense Report end date (optional)
 * @param status?: string - Expense Report status (optional)
 * @param createdAt?: Date - Expense Report creation date (optional)
 * @param updatedAt?: Date - Expense Report update date (optional)
 * @param idEmployee: string - Unique identifier of the employee associated
 * @param expenses?: ExpenseEntity[] - Array of expenses associated with the report (optional)
 * @param totalAmount?: Decimal - Total amount of the expenses associated with the report (optional)
 *
 * @return void
 *
 * @description The structure is based on the MER, and there's the idea of using custom data types, like UUID.
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
  idEmployee: string;
  expenses?: ExpenseEntity[];
  totalAmount?: number | null;
}
