import { TaskStatus } from './task-status';

export interface BareboneTask {
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor: string;
  startDate: string | null;
  dueDate: string | null;
  workedHours: string | null;
  idProject: string;
}

export interface Task extends BareboneTask {
  id: string;
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
