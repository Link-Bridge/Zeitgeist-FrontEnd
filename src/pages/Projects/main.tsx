import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import Loader from '../../components/common/Loader';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';

type MainProjectProps = {
  idProject: string;
  setProjectId: any;
};

const ProjectMain = ({ idProject, setProjectId }: MainProjectProps) => {
  const req = useHttp<Response<ProjectEntity>>('/project', RequestMethods.GET);
  const [companyNames, setCompanyNames] = useState(new Map<string, string>());
  const [isLoading, setIsLoading] = useState(req.loading);

  useEffect(() => {
    req.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getNames() {
      setIsLoading(true);
      if (req.data) {
        const data = await getClientsNames(req.data.data);
        setCompanyNames(data);
        console.log(data);
      }
      setIsLoading(false);
    }
    getNames();
  }, [req.data]);
  return (
    <main className='flex flex-col gap-4 flex-1 min-h-0'>
      <section className='h-10 flex justify-end'>
        <Link to={`${RoutesPath.PROJECTS}/new`}>
          <AddButton onClick={() => {}}></AddButton>
        </Link>
      </section>
      <section className='flex-1 overflow-scroll'>
        <div className='bg-[#FAFAFA] rounded-xl overflow-y-scroll grid grid-cols-3 flex-1 min-h-0 shadow-lg p-4 gap-5'>
          {isLoading && <Loader />}
          {!isLoading &&
            req.data?.data.map(project => (
              <Link to={`/projects/details/${project.id}`}>
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  company={companyNames.get(project.idCompany) ?? ''}
                  department={project.area}
                  name={project.name}
                  status={project.status}
                  onClick={setProjectId(project.id)}
                />
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
};

async function getClientsNames(projects: ProjectEntity[]) {
  const idToken = sessionStorage.getItem('idToken');
  const names = new Map<string, string>();
  projects.map(project => !names.has(project.idCompany) && names.set(project.idCompany, ''));
  const reqs: Promise<globalThis.Response>[] = [];
  for (const id of names.keys()) {
    reqs.push(
      fetch(`http://localhost:4000/api/v1/company/${id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      })
    );
  }
  const data = (await Promise.all(reqs)).map(r => r.json());
  (await Promise.all(data)).map(d => names.set(d.data.id, d.data.name));
  return names;
}

export default ProjectMain;
