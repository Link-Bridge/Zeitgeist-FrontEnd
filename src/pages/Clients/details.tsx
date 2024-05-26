import { DeleteOutline } from '@mui/icons-material';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Box, Button, Chip, Divider, Typography } from '@mui/joy';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import colors from '../../colors';
import ArchiveModal from '../../components/common/ArchiveModal';
import DeleteModal from '../../components/common/DeleteModal';
import GoBack from '../../components/common/GoBack';
import ClientFormModal from '../../components/modules/Clients/ClientFormModal';
import styles from '../../components/modules/Clients/details.module.css';
import { EmployeeContext } from '../../hooks/employeeContext';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useDeleteCompany from '../../hooks/useDeleteCompany';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ResponseEntity } from '../../types/response';
import { RequestMethods, RoutesPath } from '../../utils/constants';
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
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openArchive, setOpenArchive] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [company, setCompany] = useState<CompanyEntity | null>(null);
  const { setState } = useContext(SnackbarContext);
  const { clientId } = useParams();
  const { data, error, loading, sendRequest } = useHttp<ResponseEntity<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );
  const { employee } = useContext(EmployeeContext);
  const [notFound, setNotFound] = useState(false);
  const { deleteCompany, error: deleteError } = useDeleteCompany();

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('Invalid uuid') || message.includes('unexpected error')) {
        setNotFound(true);
      }
    }
  }, [error]);

  useEffect(() => {
    if (deleteError) {
      setState({
        open: true,
        message: 'Failed to delete company',
        type: 'danger',
      });
    }
  }, [deleteError, setState]);

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
  }, []);

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

  const handleDeleteCompany = async (id: string) => {
    try {
      await deleteCompany(id);
      setState({
        open: true,
        message: 'Company deleted successfully',
        type: 'success',
      });
      navigate(RoutesPath.CLIENTS);
    } catch (error) {
      setState({
        open: true,
        message: 'Failed to delete company',
        type: 'danger',
      });
    }
  };

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
            <ClientFormModal
              open={editModalOpen}
              setOpen={setEditModalOpen}
              data={company}
              id={clientId}
              updateFunction={setCompany}
            />
            <section className='flex justify-between overflow-x-hidden gap-x-4 items-center'>
              <div className='flex flex-grow flex-col lg:flex-row justify-between items-center gap-4 min-w-0'>
                <p className='text-2xl text-gold font-medium truncate flex-grow'>{company.name}</p>
                <div className='flex flex-wrap items-center gap-x-5 flex-shrink-0'>
                  <Typography>Constitution date:</Typography>
                  <Chip color='primary' variant='outlined'>
                    {company.constitutionDate
                      ? dayjs.utc(company.constitutionDate).format('DD/MM/YYYY')
                      : 'No date'}
                  </Chip>
                </div>
              </div>
              <div className='flex gap-5 flex-shrink-0'>
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
                  <>
                    <Button
                      onClick={ToggleModalArchive}
                      sx={{
                        backgroundColor: colors.lightWhite,
                        ':hover': { backgroundColor: colors.orangeChip },
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

                    <Button
                      onClick={() => setOpenDelete(true)}
                      sx={{
                        backgroundColor: colors.lightWhite,
                        ':hover': { backgroundColor: colors.orangeChip },
                        height: '5px',
                      }}
                      startDecorator={<DeleteOutline sx={{ width: 24, color: colors.gold }} />}
                    >
                      <Typography sx={{ color: colors.gold }}>Delete</Typography>
                    </Button>
                  </>
                )}
              </div>
            </section>

            <section className={`flex justify-between mt-8 flex-wrap ${styles.container}`}>
              <article className='flex flex-1 min-w-44 gap-1 truncate'>
                <EmailOutlinedIcon />
                <p className='max-w-full truncate'>{company.email}</p>
              </article>
              <article className='flex flex-1 min-w-44 gap-1'>
                <AbcOutlinedIcon />
                <p>{company.rfc}</p>
              </article>
              <article className='flex flex-1 min-w-44 gap-1'>
                <BusinessOutlinedIcon />
                <p className='max-w-full truncate'>{company.taxResidence}</p>
              </article>
              <article className='flex flex-1 min-w-44 gap-1'>
                <StayPrimaryPortraitOutlinedIcon />
                <p>{company.phoneNumber}</p>
              </article>
            </section>
          </>
        )}
        <Divider sx={{ marginTop: '30px' }} />
        <ProjectsClientList clientId={clientId ?? ''} isCompanyArchived={company?.archived} />
      </section>
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        title='Delete Company'
        description='Every project and task associated with this company will be eliminated.'
        id={company?.id ?? ''}
        handleDelete={handleDeleteCompany}
        alertColor='danger'
      />
    </main>
  );
};

export default ClientDetails;
