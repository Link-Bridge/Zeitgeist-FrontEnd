import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Typography } from '@mui/joy';
import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import AddButton from '../../components/common/AddButton';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import GenericDropdown from '../../components/common/GenericDropdown';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import { EmployeeContext } from '../../hooks/employeeContext';
import useHttp from '../../hooks/useHttp';
import { axiosInstance } from '../../lib/axios/axios';
import { ProjectEntity, ProjectFilters } from '../../types/project';
import { Response } from '../../types/response';
import { APIPath, RequestMethods, RoutesPath } from '../../utils/constants';

const ProjectMain = () => {
  const req = useHttp<Response<ProjectEntity>>('/project', RequestMethods.GET);
  const [companyNames, setCompanyNames] = useState(new Map<string, string>());
  const [filter, setFilter] = useState<string>(ProjectFilters.NOT_ARCHIVED);
  const [filteredProjects, setFilteredProjects] = useState<ProjectEntity[]>([]);
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [isLoading, setIsLoading] = useState(req.loading);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('Name');
  const { employee } = useContext(EmployeeContext);

  useEffect(() => {
    if (!req.data) req.sendRequest();
    if (req.data) {
      setProjects(req.data.data);
      setFilteredProjects(req.data.data);
    }

    async function getNames() {
      setIsLoading(true);
      if (req.data) {
        const data = await getClientsNames(req.data.data);
        setCompanyNames(data);
      }
      setIsLoading(false);
    }
    getNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req.data]);

  const handleFilter = (value: string) => {
    setFilter(value);

    if (value == ProjectFilters.ALL) {
      setFilteredProjects(
        projects.filter(project => {
          const companyName = companyNames.get(project.idCompany) ?? '';
          if (filterOption === 'Company') {
            return companyName.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return project.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (value == ProjectFilters.ARCHIVED) {
      setFilteredProjects(
        projects.filter(project => {
          const companyName = companyNames.get(project.idCompany) ?? '';
          if (filterOption === 'Company') {
            return (
              companyName.toLowerCase().includes(searchTerm.toLowerCase()) && project.isArchived
            );
          }
          return (
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) && project.isArchived
          );
        })
      );
    }

    if (value == ProjectFilters.NOT_ARCHIVED) {
      setFilteredProjects(
        projects.filter(project => {
          const companyName = companyNames.get(project.idCompany) ?? '';
          if (filterOption === 'Company') {
            return (
              companyName.toLowerCase().includes(searchTerm.toLowerCase()) && !project.isArchived
            );
          }
          return (
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) && !project.isArchived
          );
        })
      );
    }
  };

  useEffect(() => {
    handleFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, projects, companyNames, filterOption]);

  return (
    <main className='min-h-full flex flex-col overflow-hidden'>
      <section className='flex flex-wrap justify-between flex-row md:items-center md-2'>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder='Search projects'
          options={['Name', 'Company']}
          setSelectedOption={setFilterOption}
          maxLength={70}
        />
        <div className='flex flex-wrap flex-row items-center gap-2 my-4 w-full'>
          {employee?.role === 'Admin' ? (
            <div className='flex justify-between w-full items-center gap-2 my-6 mt-2'>
              <div className='flex-row flex items-center sm:gap-2'>
                <FilterAltIcon sx={{ width: '30px', height: '30px' }} className='text-gold' />
                <Typography
                  sx={{
                    color: colors.gold,
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                      fontSize: '14px',
                    },
                    '@media (min-width: 960px)': {
                      fontSize: '20px',
                    },
                  }}
                >
                  Filter Projects:
                </Typography>
              </div>
              <GenericDropdown
                value={filter}
                options={Object.values(ProjectFilters)}
                onChange={value => handleFilter(value)}
              />
            </div>
          ) : null}
          <Link to={`${RoutesPath.PROJECTS}/new`}>
            <AddButton onClick={() => {}}></AddButton>
          </Link>
        </div>
      </section>
      {filteredProjects.length === 0 ? (
        <ComponentPlaceholder text='No projects were found' />
      ) : (
        <section className='overflow-y-auto bg-cardBg rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-0 shadow-lg p-4 gap-5'>
          {isLoading ? (
            <Loader />
          ) : (
            filteredProjects.map(project => (
              <Link to={`/projects/details/${project.id}`} key={project.id}>
                <ProjectCard
                  key={project.id}
                  company={companyNames.get(project.idCompany) ?? ''}
                  department={project.area}
                  name={project.name}
                  status={project.status}
                />
              </Link>
            ))
          )}
        </section>
      )}
    </main>
  );
};

async function getClientsNames(projects: ProjectEntity[]) {
  const names = new Map<string, string>();
  projects.map(project => !names.has(project.idCompany) && names.set(project.idCompany, ''));

  const reqs: Promise<AxiosResponse<unknown>>[] = [];

  for (const id of names.keys()) {
    reqs.push(axiosInstance.get(`${import.meta.env.VITE_BASE_API_URL}${APIPath.COMPANIES}/${id}`));
  }

  const responses = await Promise.all(reqs);
  responses.forEach(response => {
    if (response.data && response.data.data) {
      names.set(response.data.data.id, response.data.data.name);
    }
  });

  return names;
}

export default ProjectMain;
