import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import ClientCard from '../../components/common/ClientCard';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import GenericDropdown from '../../components/common/GenericDropdown';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import NewClientFormModal from '../../components/modules/Clients/NewClientFormModal';
import { EmployeeContext } from '../../hooks/employeeContext';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity, CompanyFilters } from '../../types/company';
import { RequestMethods, RoutesPath } from '../../utils/constants';
import { truncateText } from '../../utils/methods';

const ClientList = (): JSX.Element => {
  const [companies, setClientsData] = useState<CompanyEntity[]>([]);
  const [filteredCompanies, setFilteredClientsData] = useState<CompanyEntity[]>([]);
  const clientsRequest = useHttp<CompanyEntity[]>('/company/', RequestMethods.GET);
  const [isLoading, setIsLoading] = useState(clientsRequest.loading);
  const [open, setOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { employee } = useContext(EmployeeContext);

  const isAdmin = employee?.role === 'Admin';

  useEffect(() => {
    const filtered = clientsRequest.data
      ? clientsRequest.data.filter(
          company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (isAdmin || !company.archived)
        )
      : [];
    setFilteredClientsData(filtered);
  }, [searchTerm, clientsRequest.data]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = (value: string) => {
    setFilteredClientsData(companies);

    if (value == CompanyFilters.ALL) {
      setFilteredClientsData(companies => {
        return companies.filter(company => isAdmin || !company.archived);
      });
    }

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
      setIsLoading(true);
      clientsRequest.sendRequest();
    } else {
      setClientsData(clientsRequest.data);
      setFilteredClientsData(companies => {
        return companies.filter(company => isAdmin || !company.archived);
      });
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsRequest.data]);

  useEffect(() => {}, [handleFilter]);

  const openModal = () => {
    setOpen(true);
  };

  if (isLoading) {
    return (
      <main className='flex flex-col gap-2 flex-1 min-h-0'>
        <section className='flex justify-between items-center w-full p-2'>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search by name'
            setSelectedOption={() => {}}
            options={[]}
          />
          <div className='flex flex-row items-center gap-2'>
            {isAdmin && (
              <div className='flex flex-row items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <FilterAltIcon
                    sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
                    className='text-gold'
                  />
                  <p>Filter Clients:</p>
                </div>
                <GenericDropdown
                  defaultValue={CompanyFilters.ALL}
                  options={[
                    CompanyFilters.ALL,
                    CompanyFilters.NOT_ARCHIVED,
                    CompanyFilters.ARCHIVED,
                  ]}
                  onChange={value => handleFilter(value)}
                />
              </div>
            )}
            <AddButton onClick={openModal} />
          </div>
        </section>
        <NewClientFormModal open={open} setOpen={setOpen} setRefetch={setRefetch} />
        <section className='flex-1 overflow-scroll'>
          <div className='bg-cardBg rounded-xl flex-1 grid md:grid-cols-2 lg:grid-cols-3 min-h-0 shadow-lg p-4 gap-5'>
            <Loader />
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='min-h-0 min-w-[590px] flex flex-col gap-2 overscroll-none'>
      <section className='flex flex-col justify-between md:flex-row md:items-center md-2 gap-y-2'>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder='Search by name'
          setSelectedOption={() => {}}
          options={[]}
        />
        <div className='flex flex-row items-center gap-2'>
          {isAdmin && (
            <div className='flex flex-row items-center gap-2'>
              <div className='flex items-center gap-2'>
                <FilterAltIcon
                  sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
                  className='text-gold'
                />
                <p>Filter Clients:</p>
              </div>
              <GenericDropdown
                defaultValue={CompanyFilters.ALL}
                options={[CompanyFilters.ALL, CompanyFilters.NOT_ARCHIVED, CompanyFilters.ARCHIVED]}
                onChange={value => handleFilter(value)}
              />
            </div>
          )}
          <AddButton onClick={openModal} />
        </div>
      </section>
      <NewClientFormModal open={open} setOpen={setOpen} setRefetch={setRefetch} />
      {filteredCompanies.length === 0 ? (
        <ComponentPlaceholder text='No companies were found' />
      ) : (
        <section className='overflow-y-auto bg-cardBg rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-0 shadow-lg p-4 gap-5'>
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
        </section>
      )}
    </main>
  );
};

export default ClientList;
