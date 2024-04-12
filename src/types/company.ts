export interface CompanyEntity {
    id: string;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    landlinePhone?: string | null;
    archived: boolean;
    idCompanyDirectContact?: string | null;
    idForm?: string | null;
    created_at: Date;
    updated_at: Date | null;
    accountingHours?: number;
    legalHours?: number;
    chargeableHours?: number;
    totalProjects?: number;
  }