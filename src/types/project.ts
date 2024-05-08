export enum ProjectCategory {
  CLIENT = 'Client',
  ZEITGEIST_INTERAL = 'Zeitgeist internal',
  ACADEMIC_CONNECTION = 'Academic connection',
  GOVERNMENT = 'Government',
  SUPPLIER = 'Supplier',
  EVENT = 'Event',
  FAIRS_CONFERENCES = 'Fairs/Conferences',
  NO_CATEGORY = '-',
}

export enum ProjectPeriodicity {
  DAY = '1 day',
  WEEK = '1 week',
  TWO_WEEKS = '2 weeks',
  MONTH = '1 month',
  TWO_MONTHS = '2 months',
  FOUR_MONTHS = '4 months',
  SIX_MONTHS = '6 months',
  TWELVE_MONTHS = '12 months',
  WHEN_NEEDED = 'When needed',
}

export enum ProjectAreas {
  ACCOUNTING = 'Accounting',
  LEGAL = 'Legal',
}

export enum ProjectStatus {
  NOT_STARTED = 'Not started',
  IN_PROGRESS = 'In progress',
  IN_QUOTATION = 'In quotation',
  UNDER_REVISION = 'Under revision',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  CANCELLED = 'Cancelled',
  ACCEPTED = 'Accepted',
  DONE = 'Done',
}

export interface ProjectEntity {
  id: string;
  name: string;
  matter: string;
  description: string;
  status: ProjectStatus;
  category: string;
  startDate: Date;
  endDate: Date;
  area: ProjectAreas;
  totalHours: number;
  periodicity: ProjectPeriodicity;
  isChargeable: boolean;
  isArchived: boolean;
  created_at: Date;
  idCompany: string;
  payed: boolean;
}

export enum ProjectFilters {
  ARCHIVED = 'Archived',
  NOT_ARCHIVED = 'Not Archived',
  ALL = 'All',
}
