import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import styles from '../../components/modules/Clients/details.module.css';
import { Box, Button, Chip, Snackbar, Typography } from '@mui/joy';
import Divider from '@mui/material/Divider';
import { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import colors from '../../colors';
import ArchiveModal from '../../components/common/ArchiveModal';
import GoBack from '../../components/common/GoBack';
import EditClientFormModal from '../../components/modules/Clients/EditClientFormModal';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext, SnackbarState } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ResponseEntity } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';
import { formatDate } from '../../utils/methods';
import { ProjectsClientList } from '../Projects/ProjectsClientList';

/**
 * Client Details Page page
 *
 * @component
 * @param {ClientDetailProps} props - Page props
 * @param {string} props.clientId - The id of the client
 *
 * @returns {JSX.Element} Client details page
 */

const ClientDetails = () => {
  // const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openArchive, setOpenArchive] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [company, setCompany] = useState<CompanyEntity | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const { clientId } = useParams();
  const { data, error, loading, sendRequest } = useHttp<ResponseEntity<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );
  const { employee } = useContext(EmployeeContext);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('Invalid uuid') || message.includes('unexpected error')) {
        setNotFound(true);
      }
    }
  }, [error]);

  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    if (!data) sendRequest();
    if (data && data.data) setCompany(data.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    sendRequest();
    if (data && data.data) setCompany(data.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return <Navigate to='/404' replace />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ToggleModalArchive = () => setOpenArchive(!openArchive);

  const isAdmin = employee?.role === 'Admin';

  return (
    <main className='min-h-0 flex flex-col gap-2 overflow-hidden'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      <section className='overflow-y-auto overflow-hidden bg-white rounded-xl p-6 '>
        <ArchiveModal
          sendRequest={sendRequest}
          toggleModal={ToggleModalArchive}
          open={openArchive}
          setOpen={setOpenArchive}
          id={company?.id ?? ''}
          title={`${company?.archived ? 'Unarchive' : 'Archive'}`}
          description={`Are you sure you want to ${company?.archived ? 'unarchive' : 'archive'} this client?`}
          handleArchiveClient={(status: string) => {
            if (status == 'success') {
              setState({
                open: true,
                message: `Client ${company?.archived ? 'unarchived' : 'archived'} successfully`,
                type: 'success',
              });
            } else {
              setState({
                open: true,
                message: `An error occured while ${company?.archived ? 'unarchiving' : 'archiving'} client`,
                type: 'danger',
              });
            }
            setTimeout(() => {
              navigate(RoutesPath.CLIENTS);
            }, 2000);
          }}
        ></ArchiveModal>
        {company && !loading && (
          <>
            <EditClientFormModal
              open={editModalOpen}
              setOpen={setEditModalOpen}
              clientData={company}
              setRefetch={setRefetch}
            />
            <section className='flex justify-between overflow-x-scroll lg:overflow-x-hidden gap-x-4'>
              <div className='flex flex-auto flex-col lg:flex-row justify-between'>
                <p className='text-2xl text-gold font-medium truncate'>{company.name}</p>
                <div className='flex flex-wrap items-center gap-x-5'>
                  <Typography>Constitution date:</Typography>
                  <Chip color='primary' variant='outlined'>
                    {formatDate(company.constitutionDate ?? null)}
                  </Chip>
                </div>  
              </div>
              <div className='flex gap-5'>
                <Button
                  onClick={handleEditClick}
                  sx={{
                    backgroundColor: colors.lightWhite,
                    ':hover': {
                      backgroundColor: colors.orangeChip,
                    },
                    height: '5px',
                  }}
                  startDecorator={<EditOutlinedIcon sx={{ width: 24, color: colors.gold }} />}
                >
                  <Typography sx={{ color: colors.gold }}>Edit</Typography>
                </Button>

                {isAdmin && (
                  <Button
                    onClick={ToggleModalArchive}
                    sx={{
                      backgroundColor: colors.lightWhite,
                      ':hover': {
                        backgroundColor: colors.orangeChip,
                      },
                      height: '5px',
                      color: 'text-gold',
                    }}
                    startDecorator={
                      company?.archived ? (
                        <UnarchiveIcon sx={{ width: 24, color: colors.gold }} />
                      ) : (
                        <ArchiveIcon sx={{ width: 24, color: colors.gold }} />
                      )
                    }
                  >
                    <Typography sx={{ color: colors.gold }}>
                      {company?.archived ? 'Unarchive' : 'Archive'}
                    </Typography>
                  </Button>
                )}
              </div>
            </section>

            <section className={`flex justify-between mt-8 flex-wrap ${styles.container}`}>
              <article className='flex gap-1 truncate'>
                <EmailOutlinedIcon />
                <p>{company.email}</p>
              </article>
              <article className='flex gap-1'>
                <AbcOutlinedIcon />
                <p>{company.rfc}</p>
              </article>
              <article className='flex gap-1 truncate'>
                <BusinessOutlinedIcon />
                <p>{company.taxResidence}</p>
              </article>
              <article className='flex gap-1'>
                <StayPrimaryPortraitOutlinedIcon />
                <p>{company.phoneNumber}</p>
              </article>
            </section>
          </>
        )}
        <Divider sx={{ marginTop: '30px' }} />
        <ProjectsClientList clientId={clientId ?? ''} isCompanyArchived={company?.archived} />
      </section>

      {/* Snackbar */}
      <SnackbarContext.Provider value={{ state, setState }}>
        <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
          {state.message}
        </Snackbar>
      </SnackbarContext.Provider>
    </main>
  );
};

export default ClientDetails;
