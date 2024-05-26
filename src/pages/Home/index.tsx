import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import Loader from '../../components/common/Loader';
import ClientCard from '../../components/modules/Home/ClientCard';
import ProjectCard from '../../components/modules/Projects/ProjectCard';
import { EmployeeContext } from '../../hooks/employeeContext';
import useHttp from '../../hooks/useHttp';
import { HomeEntity } from '../../types/home';
import { ResponseEntity } from '../../types/response';
import { RequestMethods } from '../../utils/constants';

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
  }, [req.data]);

  function findCompanyNameById(id: string): string | undefined {
    const foundCompany = homeData?.companies.find(company => company.id === id);
    return foundCompany ? foundCompany.name : undefined;
  }

  return (
    <main className='min-h-full overflow-y-auto overflow-x-hidden grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
      <section className='bg-[#FAFAFA] rounded-xl basis-4/6 p-5 sm:p-8 lg:col-span-2 font-["Didot"] shadow-lg'>
        <h2 className='text-[25px] sm:text-[34px]'>MY PROJECTS </h2>
        {isLoading && <Loader />}
        {!isLoading && homeData && homeData.projects.length > 0 ? (
          <section className='overflow-y-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 rounded-xl mt-6'>
            {homeData.projects.map(project => (
              <Link to={`/projects/details/${project.id}`} key={project.id}>
                <ProjectCard
                  key={project.id}
                  company={findCompanyNameById(project.idCompany)}
                  department={project.area}
                  name={project.name}
                  status={project.status}
                />
              </Link>
            ))}
          </section>
        ) : (
          <ComponentPlaceholder text='No projects available' />
        )}
      </section>
      <section className='bg-[#FAFAFA] rounded-xl basis-2/6 p-5 sm:p-8 font-["Didot"] shadow-lg flex-1 min-w-[285px]'>
        <h2 className='text-[25px] sm:text-[34px]'>MY CLIENTS</h2>
        {isLoading && <Loader />}
        {!isLoading && homeData && homeData.companies.length > 0 ? (
          <section className='overflow-y-auto grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 rounded-xl mt-6'>
            {homeData.companies.map(company => (
              <Link to={`/clients/details/${company.id}`} key={company.id}>
                <ClientCard name={company.name} chargeableHours={company.chargeableHours || 0} />
              </Link>
            ))}
          </section>
        ) : (
          <ComponentPlaceholder text='No clients available' />
        )}
      </section>
    </main>
  );
};

export default Home;
