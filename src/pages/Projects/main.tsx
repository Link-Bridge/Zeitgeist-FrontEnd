import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import AddButton from '../../components/common/AddButton';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import GenericDropdown from '../../components/common/GenericDropdown';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity, ProjectFilters } from '../../types/project';
import { Response } from '../../types/response';
import { APIPath, BASE_API_URL, RequestMethods, RoutesPath } from '../../utils/constants';

const ProjectMain = () => {
  const req = useHttp<Response<ProjectEntity>>('/project', RequestMethods.GET);
  const [companyNames, setCompanyNames] = useState(new Map<string, string>());
  const [filteredProjects, setFilteredProjects] = useState<ProjectEntity[]>([]);
  const [projects, setProjects] = useState<ProjectEntity[]>([]);
  const [isLoading, setIsLoading] = useState(req.loading);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('Name');

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
    setFilteredProjects(projects);

    if (value == ProjectFilters.ALL) return;

    if (value == ProjectFilters.ARCHIVED) {
      setFilteredProjects(projects => {
        return projects.filter(project => project.isArchived);
      });
    }
    if (value == ProjectFilters.NOT_ARCHIVED) {
      setFilteredProjects(projects => {
        return projects.filter(project => !project.isArchived);
      });
    }
  };

  useEffect(() => {
    const filtered = projects.filter(project => {
      const companyName = companyNames.get(project.idCompany) ?? '';
      if (filterOption === 'Company') {
        return companyName.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return project.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProjects(filtered);
  }, [searchTerm, projects, companyNames, filterOption]);

  return (
    <main className='flex flex-col gap-2 flex-1 min-h-0'>
      <section className='flex justify-between items-center w-full p-2'>
        <div className='flex grow items-center'>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search projects'
            options={['Name', 'Company']}
            setSelectedOption={setFilterOption}
          />
        </div>
        <div className='flex items-center gap-4'>
          <Box
            sx={{
              display: 'flex',
              padding: '5px',
              borderRadius: '10px',
              alignItems: 'center',
            }}
          >
            <FilterAltIcon sx={{ width: '30px', height: '30px' }} className='text-gold' />
            <Typography sx={{ color: colors.gold, fontWeight: 'bold' }}>
              Filter Projects:
            </Typography>
          </Box>
          <GenericDropdown
            defaultValue={ProjectFilters.ALL}
            options={[ProjectFilters.ALL, ProjectFilters.NOT_ARCHIVED, ProjectFilters.ARCHIVED]}
            onValueChange={value => handleFilter(value)}
          />
          <Link to={`${RoutesPath.PROJECTS}/new`}>
            <AddButton onClick={() => {}}></AddButton>
          </Link>
        </div>
      </section>
      {projects.length === 0 ? (
        <ComponentPlaceholder text='No projects were found' />
      ) : (
        <section className='flex-1 overflow-scroll'>
          <div className='bg-cardBg rounded-xl flex-1 grid md:grid-cols-2 lg:grid-cols-3 min-h-0 shadow-lg p-4 gap-5'>
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
          </div>
        </section>
      )}
    </main>
  );
};

async function getClientsNames(projects: ProjectEntity[]) {
  const idToken = localStorage.getItem('idToken');
  const names = new Map<string, string>();
  projects.map(project => !names.has(project.idCompany) && names.set(project.idCompany, ''));
  const reqs: Promise<globalThis.Response>[] = [];
  for (const id of names.keys()) {
    reqs.push(
      fetch(`${BASE_API_URL}${APIPath.COMPANIES}/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      })
    );
  }
  const data = (await Promise.all(reqs)).map(r => r.json());
  (await Promise.all(data)).map(d => names.set(d.data.id, d.data.name));
  return names;
}

export default ProjectMain;
