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
