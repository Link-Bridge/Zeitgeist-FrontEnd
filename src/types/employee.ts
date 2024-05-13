export interface EmployeeEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  idDepartment: string;
  idRole: string;
}

export interface EmployeeReponse {
  data: {
    employee: EmployeeEntity;
    role: string;
    department: string;
  };
}
