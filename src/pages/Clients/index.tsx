import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import CardsGrid from '../../components/common/CardsGrid';
import ClientCard from '../../components/common/ClientCard';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import GenericDropdown from '../../components/common/GenericDropdown';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import NewClientFormModal from '../../components/modules/Clients/NewClientFormModal';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity, CompanyFilters } from '../../types/company';
import { RequestMethods, RoutesPath } from '../../utils/constants';
import { truncateText } from '../../utils/methods';
import ClientDetails from './ClientDetails/ClientDetails';

const Clients = () => {
  const [companies, setClientsData] = useState<CompanyEntity[]>([]);
  const [filteredCompanies, setFilteredClientsData] = useState<CompanyEntity[]>([]);
  const clientsRequest = useHttp<CompanyEntity[]>('/company/', RequestMethods.GET);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = clientsRequest.data
      ? clientsRequest.data.filter(company =>
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredClientsData(filtered);
  }, [searchTerm, clientsRequest.data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = (value: string) => {
    setFilteredClientsData(companies);

    if (value == CompanyFilters.ALL) return;

    if (value == CompanyFilters.ARCHIVED) {
      setFilteredClientsData(companies => {
        return companies.filter(company => company.archived);
      });
    }
    if (value == CompanyFilters.NOT_ARCHIVED) {
      setFilteredClientsData(companies => {
        return companies.filter(company => !company.archived);
      });
    }
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
      setFilteredClientsData(clientsRequest.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsRequest.data]);

  useEffect(() => {}, [handleFilter]);

  const openModal = () => {
    setOpen(true);
  };

  if (!companies || companies.length === 0) {
    return <ComponentPlaceholder text='No companies were found' />;
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='py-0 flex flex-col min-h-0 flex-1'>
            <section className='flex flex-row justify-between items-center mb-2 w-full'>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder='Search by name'
                options={[]}
              />
              <div className='flex flex-row items-center gap-2'>
                <GenericDropdown
                  defaultValue={CompanyFilters.ALL}
                  options={[
                    CompanyFilters.ALL,
                    CompanyFilters.NOT_ARCHIVED,
                    CompanyFilters.ARCHIVED,
                  ]}
                  onValueChange={value => handleFilter(value)}
                />
                <AddButton onClick={openModal} />
              </div>
            </section>
            <NewClientFormModal open={open} setOpen={setOpen} setRefetch={setRefetch} />
            <div className='flex justify-center w-full'>
              {clientsRequest.loading && <Loader />}
              {clientsRequest.error && <p>Error loading companies.</p>}
            </div>
            {!clientsRequest.loading && !clientsRequest.error && companies && (
              <CardsGrid>
                {filteredCompanies.map(company => (
                  <Link to={`${RoutesPath.CLIENTS}/details/${company.id}`} key={company.id}>
                    <ClientCard
                      name={truncateText(company.name)}
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
      <Route path={'/details/:clientId'} element={<ClientDetails />} />
    </Routes>
  );
};

export default Clients;
