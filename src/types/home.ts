import { CompanyEntity } from '../types/company';
import { ProjectEntity } from '../types/project';

export interface HomeEntity {
  projects: Array<ProjectEntity>;
  companies: Array<CompanyEntity>;
}
