import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import CardsGrid from '../../components/common/CardsGrid';
import ClientCard from '../../components/common/ClientCard';
import Loader from '../../components/common/Loader';
import NewClientFormModal from '../../components/modules/Clients/NewClientFormModal';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { RequestMethods } from '../../utils/constants';
import ClientDetails from './ClientDetails/ClientDetails';

const Clients = () => {
  const [clientId] = useState<string>('');

  const { data, error, loading, sendRequest } = useHttp<CompanyEntity[]>(
    '/company',
    RequestMethods.GET
  );

  const companies: CompanyEntity[] = data ? data.flat() : [];
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='p-10 py-0 flex flex-col min-h-0 flex-1'>
            <section className='flex flex-row justify-end p-5 gap-6'>
              <button>Not Archived</button>
              <AddButton onClick={openModal} />
            </section>
            <NewClientFormModal open={open} setOpen={setOpen} setRefetch={setRefetch} />

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
        }
      />
      <Route path={`/${clientId}`} element={<ClientDetails clientId={clientId} />} />
    </Routes>
  );
};

export default Clients;
