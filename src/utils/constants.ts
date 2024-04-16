export enum EnvKeysValues {
  BASE_API_URL = 'http://10.25.69.199:4000/api/v1',
}

export enum RoutesPath {
  ROOT = '/',
  HOME = '/home',
  PROJECTS = '/projects',
  PROJECT_REPORT = '/projects/report/:id',
  TASKS = '/tasks',
  CLIENTS = '/clients',
  EMPLOYEES = '/employees',
}

export enum APIPath {
  PROJECT_REPORT = '/project/report',
}

export enum ReportStatus {
  IN_QUOTATION = 'In quotation',
  WITHOUT_STATUS = '-',
  CANCELLED = 'Cancelled',
}
