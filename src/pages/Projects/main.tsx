import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import Loader from '../../components/common/Loader';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';

const ProjectMain = () => {
  const req = useHttp<Response<ProjectEntity>>('/project', RequestMethods.GET);
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(req.loading);

  useEffect(() => {
    req.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getNames() {
      setIsLoading(true);
      const res: string[] = [];
      if (req.data) {
        const idToken = sessionStorage.getItem('idToken');
        for (const project of req.data.data) {
          const r = await fetch(`http://localhost:4000/api/v1/company/${project.idCompany}`, {
            headers: { Authorization: `Bearer ${idToken}` },
          });
          const d = await r.json();
          res.push(d.data.name);
        }
        setCompanyNames(res);
        setIsLoading(false);
      }
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
            req.data?.data.map((project, i) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                company={companyNames[i]}
                department={project.area}
                name={project.name}
                status={project.status}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default ProjectMain;
