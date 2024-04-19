import { TaskStatus } from './task-status';

export interface TaskEntity {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor?: string;
  startDate: Date | null;
  endDate?: Date | null;
  workedHours?: number;
  createdAt: Date;
  updatedAt: Date | null;
  idProject: string;
}
