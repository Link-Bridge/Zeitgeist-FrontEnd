export interface DepartmentEntity {
  id: string;
  title: SupportedDepartments;
  createdAt: Date;
  updatedAt?: Date | null;
}

enum SupportedDepartments {
  WITHOUT_DEPARTMENT = 'Without department',
  LEGAL = 'Legal',
  ACCOUNTING = 'Accounting',
}
