import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import Loader from '../../components/common/Loader';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import useFetch from '../../hooks/useFetch';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { RoutesPath } from '../../utils/constants';

const ProjectMain = () => {
  const req = useFetch<Response<ProjectEntity>>('http://localhost:4000/api/v1/project');
  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(req.isLoading);
  useEffect(() => {
    async function getNames() {
      setIsLoading(true);
      const res: string[] = [];
      if (req.data) {
        for (const project of req.data.data) {
          const r = await fetch(`http://localhost:4000/api/v1/company/${project.idCompany}`);
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
