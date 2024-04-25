import { useEffect, useState } from 'react';

import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { RequestMethods } from '../../utils/constants';

import AddButton from '../../components/common/AddButton';
import CardProject from '../../components/common/CardProject';

type ProjectsClientListProps = {
  clientId: string;
};

export const ProjectsClientList = ({ clientId }: ProjectsClientListProps) => {
  const [projectsGroup, setProjectsGroup] = useState<ProjectEntity[]>([]);
  const { data, error, loading, sendRequest } = useHttp<Response<ProjectEntity[]>>(
    `/project/${clientId}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (data && data.data) {
      setProjectsGroup(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!data || data.data.length === 0) {
      sendRequest();
    }
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
        <section className='flex gap-5'>
          <AddButton>Test</AddButton>
        </section>
      </section>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      {projectsGroup.length > 0 && (
        <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 rounded-xl mt-6'>
          {projectsGroup.map(project => (
            <CardProject
              key={project.id}
              name={project.name}
              status={project.status}
              department={project.area}
            />
          ))}
        </section>
      )}
    </main>
  );
};
