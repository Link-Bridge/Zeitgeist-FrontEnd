import { ProjectEntity } from '../types/project';
import { CompanyEntity } from '../types/company';

export interface HomeEntity {
    projects: Array<ProjectEntity>;
    companies: Array<CompanyEntity>;
}