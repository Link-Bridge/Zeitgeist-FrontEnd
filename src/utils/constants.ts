export enum EnvKeysValues {
  BASE_API_URL = 'https://api.example.com',
}

export enum RoutesPath {
  ROOT = '/',
  HOME = '/home',
  PROJECTS = '/projects',
  TASKS = '/tasks',
  CLIENTS = '/clients',
  EMPLOYEES = '/employees',
}

export enum APIPath {
  PROJECT_REPORT = '/project/report',
}

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum NotificationTitles {
  NEW_TASK = 'New Task Assigned',
  NEW_PROJECT = 'New Project Assigned',
  DELETED_TASK = 'Task Deleted',
  DELETED_PROJECT = 'Project Deleted',
  NEW_CHANGES_TASK = 'New Changes on Task',
  NEW_CHANGES_PROJECT = 'New Changes on Project',
}

export enum NotificationDescriptions {
  NEW_TASK = 'You have been assigned to a new task. Go check it out!',
  NEW_PROJECT = 'You have been assigned to a new project. Go check it out!',
  DELETED_TASK = 'A task assigned to you was deleted. Ask the reason.',
  DELETED_PROJECT = 'A project assigned to you was deleted. Ask the reason.',
  NEW_CHANGES_TASK = 'There have been new changes on a task assigned to you.',
  NEW_CHANGES_PROJECT = 'There have been new changes on a project assigned to you.',
}