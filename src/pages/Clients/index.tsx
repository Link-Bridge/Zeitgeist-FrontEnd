import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import CardsGrid from '../../components/common/CardsGrid';
import ClientCard from '../../components/common/ClientCard';
import Loader from '../../components/common/Loader';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { Response } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';
import ClientDetails from './ClientDetails/ClientDetails';

const Clients = () => {
  const [clientId, setClientId] = useState<string>('');

  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity[]>>(
    '/company',
    RequestMethods.GET
  );
  const companies: CompanyEntity[] = data && data.data ? data.data.flat() : [];

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Routes>
      <Route
        path='/'
        element={
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
                  <Link
                    key={company.id}
                    to={`${RoutesPath.CLIENTS}/${company.id}`}
                    onClick={() => setClientId(company.id)}
                  >
                    <ClientCard
                      name={company.name}
                      accountingHours={company.accountingHours || 0}
                      legalHours={company.legalHours || 0}
                      chargeableHours={company.chargeableHours || 0}
                      totalProjects={company.totalProjects || 0}
                    />
                  </Link>
                ))}
              </CardsGrid>
            )}
          </main>
        }
      />
      <Route path={`/${clientId}`} element={<ClientDetails clientId={clientId} />} />
    </Routes>
  );
};

export default Clients;
