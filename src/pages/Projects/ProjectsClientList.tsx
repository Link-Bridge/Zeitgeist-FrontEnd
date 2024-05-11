import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';

type ProjectsClientListProps = {
  clientId: string;
  isCompanyArchived: boolean;
};

export const ProjectsClientList = ({ clientId, isCompanyArchived }: ProjectsClientListProps) => {
  const [projectsGroup, setProjectsGroup] = useState<ProjectEntity[]>([]);
  const [, setSelectedProjectId] = useState<string | null>(null);
  const { data, error, loading, sendRequest } = useHttp<Response<ProjectEntity[]>>(
    `/project/${clientId}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (data && data.data) {
      setProjectsGroup(data.data.flat());
    }
  }, [data]);

  useEffect(() => {
    if (!data || data.data.length === 0) {
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Projects Client List
   *
   * @component
   * @param {ProjectsClientListProps} props - Component props
   * @param {string} props.clientId - The id of the client
   *
   * @returns {JSX.Element} Projects Client List component
   */

  return (
    <main className='mt-8'>
      <section className='flex justify-between items-center'>
        <h3 className='text-[20px] text-[#424242] font-medium'>Projects</h3>
        {!isCompanyArchived && (
          <section className='flex gap-5'>
            <Link to={`${RoutesPath.PROJECTS}/new`}>
              <AddButton onClick={() => {}}></AddButton>
            </Link>
          </section>
        )}
      </section>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {projectsGroup.length > 0 ? (
        <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 rounded-xl mt-6'>
          {projectsGroup.map(project => (
            <Link
              to={`/projects/details/${project.id}`}
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
            >
              <ProjectCard
                id={project.id}
                name={project.name}
                status={project.status}
                department={project.area}
              />
            </Link>
          ))}
        </section>
      ) : (
        <ComponentPlaceholder
          text='No projects related to this company'
          height='15vh'
          width='20vh'
        />
      )}
    </main>
  );
};
