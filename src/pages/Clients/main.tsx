import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Typography } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import AddButton from '../../components/common/AddButton';
import ClientCard from '../../components/common/ClientCard';
import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';
import GenericDropdown from '../../components/common/GenericDropdown';
import Loader from '../../components/common/Loader';
import SearchBar from '../../components/common/SearchBar';
import ClientFormModal from '../../components/modules/Clients/ClientFormModal';
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
  const [filter, setFilter] = useState<string>(CompanyFilters.NOT_ARCHIVED);
  const { employee } = useContext(EmployeeContext);

  const isAdmin = employee?.role === 'Admin';

  useEffect(() => {
    handleFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, clientsRequest.data, companies]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = (value: string) => {
    setFilteredClientsData(companies);
    setFilter(value);

    if (value == CompanyFilters.ALL) {
      setFilteredClientsData(companies => {
        return companies.filter(
          company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (isAdmin || !company.archived)
        );
      });
    }

    if (value == CompanyFilters.ARCHIVED) {
      setFilteredClientsData(companies => {
        return companies.filter(
          company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) && company.archived
        );
      });
    }
    if (value == CompanyFilters.NOT_ARCHIVED) {
      setFilteredClientsData(companies => {
        return companies.filter(
          company =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) && !company.archived
        );
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

  useEffect(() => {
    if (refetch) {
      clientsRequest.sendRequest();
      setRefetch(false);
    }
  }, [clientsRequest, refetch, handleFilter]);

  const openModal = () => {
    setOpen(true);
  };

  if (isLoading) {
    return (
      <main className='min-h-full flex flex-col gap-2 overflow-hidden mb-8'>
        <section className='flex flex-wrap justify-between flex-row md:items-center md-2 gap-2'>
          <div className='flex w-full justify-between items-center'>
            <div className='search-bar-container mb-2'>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder='Search by name'
                setSelectedOption={() => {}}
                options={[]}
                maxLength={70}
              />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full justify-between items-center'>
            {isAdmin && (
              <div className='flex justify-start w-full items-center gap-2'>
                <div className='flex-row flex items-center sm:gap-2'>
                  <FilterAltIcon
                    sx={{ width: '30px', height: '30px' }}
                    className='text-gold flex-none'
                  />
                  <Typography
                    sx={{
                      color: colors.gold,
                      fontWeight: 'bold',
                      '@media (max-width: 600px)': {
                        fontSize: '14px',
                      },
                      '@media (min-width: 960px)': {
                        fontSize: '20px',
                      },
                    }}
                  >
                    Filter Clients:
                  </Typography>
                </div>
                <GenericDropdown
                  value={filter}
                  options={Object.values(CompanyFilters)}
                  onChange={value => handleFilter(value ?? CompanyFilters.NOT_ARCHIVED)}
                />
              </div>
            )}
            <div className='w-full flex justify-end mb-2'>
              <AddButton onClick={openModal} />
            </div>
          </div>
        </section>
        <ClientFormModal open={open} setOpen={setOpen} updateFunction={setClientsData} />
        <section className='overflow-y-auto bg-cardBg rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-0 shadow-lg p-4 gap-5 mt-5'>
          <Loader />
        </section>
      </main>
    );
  }

  return (
    <main className='min-h-full flex flex-col gap-2 overflow-hidden'>
      <section className='flex flex-wrap justify-between flex-row md:items-center md-2 gap-2'>
        <div className='search-bar-container mb-2'>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder='Search by name'
            setSelectedOption={() => {}}
            options={[]}
            maxLength={70}
          />
        </div>
        <div className='flex flex-col sm:flex-row w-full justify-between items-center'>
          {isAdmin && (
            <div className='flex justify-start w-full items-center gap-2'>
              <div className='flex-row flex items-center sm:gap-2'>
                <FilterAltIcon
                  sx={{ width: '30px', height: '30px' }}
                  className='text-gold flex-none'
                />
                <Typography
                  sx={{
                    color: colors.gold,
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                      fontSize: '14px',
                    },
                    '@media (min-width: 960px)': {
                      fontSize: '20px',
                    },
                  }}
                >
                  Filter Clients:
                </Typography>
              </div>
              <GenericDropdown
                value={filter}
                options={Object.values(CompanyFilters)}
                onChange={value => handleFilter(value ?? CompanyFilters.NOT_ARCHIVED)}
              />
            </div>
          )}
          <div className='w-full flex justify-end'>
            <AddButton onClick={openModal} />
          </div>
        </div>
      </section>
      {filteredCompanies.length === 0 ? (
        <ComponentPlaceholder text='No companies were found' />
      ) : (
        <section className='overflow-y-auto overflow-hidden bg-cardBg mt-5 rounded-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-lg p-4 gap-5 mb-4'>
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
      <ClientFormModal open={open} setOpen={setOpen} updateFunction={setClientsData} />
    </main>
  );
};

export default ClientList;
