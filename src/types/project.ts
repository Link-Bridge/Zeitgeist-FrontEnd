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
  CLIENT = 'Client',
}

export enum ProjectStatus {
  NOT_STARTED = 'Not Started',
  IN_PROCESS = 'In Process',
  UNDER_REVISION = 'Under Revision',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
  IN_QUOTATION = 'In quotation',
  ACCEPTED = 'Accepted',
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
  periodicty: ProjectPeriodicity;
  isChargeable: boolean;
  created_at: Date;
  idCompany: PerformanceServerTiming;
}
