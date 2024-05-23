export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export enum RoutesPath {
  ROOT = '/',
  HOME = '/home',
  PROJECTS = '/projects',
  TASKS = '/tasks',
  CLIENTS = '/clients',
  EMPLOYEES = '/employees',
  EXPENSES = '/expenses',
}

export enum APIPath {
  PROJECT_REPORT = '/project/report',
  TASK_DETAIL = '/tasks',
  PROJECT_DETAILS = '/project/details',
  COMPANIES = '/company',
  PROJECTS = '/project',
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
