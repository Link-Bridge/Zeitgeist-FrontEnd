import { useEffect } from 'react';
import AddButton from '../../components/common/AddButton';
import CardsGrid from '../../components/common/CardsGrid';
import ClientCard from '../../components/common/ClientCard';
import Loader from '../../components/common/Loader';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { Response } from '../../types/response';
import { RequestMethods } from '../../utils/constants';

const Clients = () => {
  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity[]>>(
    '/company',
    RequestMethods.GET
  );
  const companies: CompanyEntity[] = data && data.data ? data.data.flat() : [];

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <main className='p-10 py-0 flex flex-col'>
      <section className='flex flex-row justify-end p-5 gap-6'>
        <button>Not Archived</button>
        <AddButton />
      </section>
      <div className='flex justify-center w-full'>
        {loading && <Loader />}
        {error && <p>Error loading companies.</p>}
      </div>
      {!loading && !error && companies && (
        <CardsGrid>
          {companies.map(company => (
            <ClientCard
              key={company.id}
              name={company.name}
              accountingHours={company.accountingHours || 0}
              legalHours={company.legalHours || 0}
              chargeableHours={company.chargeableHours || 0}
              totalProjects={company.totalProjects || 0}
            />
          ))}
        </CardsGrid>
      )}
    </main>
  );
};

export default Clients;
