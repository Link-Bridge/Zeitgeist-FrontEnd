import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/common/Loader';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import ClientCard from '../../components/common/ClientCard';
import useHttp from '../../hooks/useHttp';
import { EmployeeContext } from '../../hooks/employeeContext';
import { HomeEntity } from '../../types/home';
import { ResponseEntity } from '../../types/response';
import { RequestMethods } from '../../utils/constants';
import { Box } from '@mui/joy';

const Home = () => {

  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;

  const req = useHttp<ResponseEntity<HomeEntity>>(`/home/${employeeId}`, RequestMethods.GET);
  const [homeData, setHomeData] = useState<HomeEntity>();
  const [isLoading, setIsLoading] = useState(req.loading);

  useEffect(() => {
    if (employeeId) req.sendRequest();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  useEffect(() => {
    if (req.data) {
      setHomeData(req.data.data);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [req.data]);

  return (
    <main className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
      <section className='bg-[#FAFAFA] rounded-xl basis-4/6 p-10 lg:col-span-2 font-["Didot"] shadow-lg overflow-x-hidden'>
        <h2 className='text-[34px]'>MY PROJECTS </h2>
        {isLoading && <Loader />}
        {!(isLoading && homeData) &&
          <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 rounded-xl mt-6'>
            {
              homeData?.projects.map(project => (
                <Link to={`/projects/details/${project.id}`} key={project.id}>
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    company=''
                    department={project.area}
                    name={project.name}
                    status={project.status}
                  />
                </Link>
              ))
            }
          </section>
        }
      </section>
      <section className='bg-[#FAFAFA] rounded-xl basis-2/6 p-10 font-["Didot"] shadow-lg overflow-x-hidden   flex-1 overflow-scroll'>
        <h2 className='text-[34px]'>CLIENTS</h2>
        {isLoading && <Loader />}
        {!(isLoading && homeData) &&
          <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column'}} >
          {
            homeData?.companies.map(company => (
              <Link to={`/clients/${company.id}`}>
                <ClientCard
                  name={company.name}
                  accountingHours={company.accountingHours || 0}
                  legalHours={company.legalHours || 0}
                  chargeableHours={company.chargeableHours || 0}
                  totalProjects={company.totalProjects || 0}
                />
              </Link>
            ))
          }
          </Box>
        }
      </section>
    </main>
  );
};

export default Home;
