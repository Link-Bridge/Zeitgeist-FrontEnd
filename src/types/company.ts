export interface CompanyEntity {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  landlinePhone?: string | null;
  archived: boolean;
  rfc?: string | null;
  taxResidence?: string | null;
  constitutionDate?: Date | null;
  idCompanyDirectContact?: string | null;
  idForm?: string | null;
  created_at: Date;
  updated_at: Date | null;
  accountingHours?: number;
  legalHours?: number;
  chargeableHours?: number;
  totalProjects?: number;
}

export interface UpdateCompanyData {
  id: string;
  name: string;
  email?: string | null;
  phoneNumber?: string | null;
  constitutionDate?: Date | null;
  rfc?: string | null;
  taxResidence?: string | null;
}

export enum CompanyFilters {
  ARCHIVED = 'Archived',
  NOT_ARCHIVED = 'Not Archived',
  ALL = 'All',
}
