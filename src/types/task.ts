import { TaskStatus } from './task-status';

export interface BareboneTask {
  title: string;
  description: string;
  status: TaskStatus;
  startDate: string | null;
  dueDate: string | null;
  workedHours: string | null;
  idProject: string;
  idEmployee: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  startDate: Date;
  endDate: Date;
  workedHours: number;
  createdAt: Date;
  updatedAt: Date;
  idProject: string;
}

export interface TaskDetail {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor?: string;
  startDate: Date;
  endDate?: Date;
  workedHours?: number;
  createdAt: Date;
  updatedAt?: Date;
  idProject: string;
  projectName: string;
  employeeFirstName?: string;
  employeeLastName?: string;
}
