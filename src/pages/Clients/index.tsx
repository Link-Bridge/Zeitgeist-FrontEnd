import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import CardsGrid from '../../components/common/CardsGrid';
import ClientCard from '../../components/common/ClientCard';
import Loader from '../../components/common/Loader';
import NewClientFormModal from '../../components/modules/Clients/NewClientFormModal';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { EnvKeysValues, RequestMethods, RoutesPath } from '../../utils/constants';
import ClientDetails from './ClientDetails/ClientDetails';

const Clients = () => {
  const [clientId, setClientId] = useState<string>('');

  const [companies, setClientsData] = useState<CompanyEntity[]>();

  const clientsRequest = useHttp<CompanyEntity[]>('/company/', RequestMethods.GET);

  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const handleClose = (event: React.SyntheticEvent | null, value: string | null) => {
    const doFetch = async (value: string | null): Promise<void> => {
      if (value === 'Not Archived') {
        const data = await axios.get(`${EnvKeysValues.BASE_API_URL}/company/`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}` },
        });
        setClientsData(data.data);
      } else {
        const data = await axios.get(`${EnvKeysValues.BASE_API_URL}/company/archived`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}` },
        });
        setClientsData(data.data);
      }
    };
    void doFetch(value);
  };

  useEffect(() => {
    clientsRequest.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    if (!clientsRequest.data) {
      clientsRequest.sendRequest();
    } else {
      setClientsData(clientsRequest.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsRequest.data]);

  useEffect(() => {}, [handleClose]);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='py-0 flex flex-col min-h-0 flex-1'>
            <section className='flex flex-row justify-end mb-8 gap-6'>
              <Select defaultValue='Not Archived' onChange={handleClose}>
                <Option value='Not Archived'>Not Archived</Option>
                <Option value='Archived'>Archived</Option>
              </Select>
              <AddButton onClick={openModal} />
            </section>
            <NewClientFormModal open={open} setOpen={setOpen} setRefetch={setRefetch} />

            <div className='flex justify-center w-full'>
              {clientsRequest.loading && <Loader />}
              {clientsRequest.error && <p>Error loading companies.</p>}
            </div>
            {!clientsRequest.loading && !clientsRequest.error && companies && (
              <CardsGrid>
                {companies.map(company => (
                  <Link
                    to={`${RoutesPath.CLIENTS}/${company.id}`}
                    key={company.id}
                    onClick={() => {
                      setClientId(company.id);
                    }}
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
