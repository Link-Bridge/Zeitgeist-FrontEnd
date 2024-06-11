import dayjs from 'dayjs';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export enum RoutesPath {
  ROOT = '/',
  HOME = '/home',
  PROJECTS = '/projects',
  TASKS = '/tasks',
  CLIENTS = '/clients',
  EMPLOYEES = '/employees',
  EXPENSES = '/expenses',
  NOTIFICATIONS = '/notification',
}

export enum APIPath {
  PROJECT_REPORT = '/project/report',
  TASK_DETAIL = '/tasks',
  PROJECT_DETAILS = '/project/details',
  COMPANIES = '/company',
  PROJECTS = '/project',
  EXPENSES = '/expense',
  EXPENSE_REPORT = '/expense/report',
  NOTIFICATION = '/notification',
  CREATE_TASK = '/tasks/:projectId/create',
  UPDATE_TASK = '/tasks/update',
  UPDATE_TASK_STATUS = '/tasks/update/status',
}

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum SupportedRoles {
  WITHOUT_ROLE = 'No role',
  ADMIN = 'Admin',
  LEGAL = 'Legal',
  ACCOUNTING = 'Accounting',
}

export const MIN_DATE = dayjs('2018-01-01T00:00:00.000Z');
export const CLIENT_MIN_DATE = dayjs('1800-01-01T00:00:00.000Z');
export const MAX_DATE = dayjs().startOf('day').add(10, 'year');
