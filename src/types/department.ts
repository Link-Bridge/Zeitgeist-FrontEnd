export interface DepartmentEntity {
  id: string;
  title: SupportedDepartments;
  createdAt: Date;
  updatedAt?: Date | null;
}

export enum SupportedDepartments {
  WITHOUT_DEPARTMENT = 'Without department',
  LEGAL = 'Legal',
  ACCOUNTING = 'Accounting',
  LEGAL_AND_ACCOUNTING = 'Legal and accounting',
}
