import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import ArchiveModal from '../../../components/common/ArchiveModal';
// import DeleteModal from '../../../components/common/DeleteModal';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { Response } from '../../../types/response';
import { RequestMethods, RoutesPath } from '../../../utils/constants';
import { ProjectsClientList } from '../../Projects/ProjectsClientList';

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';
import { Box, Button, Snackbar, Typography } from '@mui/joy';
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../../../colors';
import GoBack from '../../../components/common/GoBack';
import { SnackbarContext, SnackbarState } from '../../../hooks/snackbarContext';
import { formatDate } from '../../../utils/methods';

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
  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ToggleModalArchive = () => setOpenArchive(!openArchive);

  return (
    <main>
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

      <section className='bg-white rounded-xl p-6'>
        <ArchiveModal
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
              navigate(RoutesPath.CLIENTS + '/');
            }, 2000);
          }}
        ></ArchiveModal>
        {company && !loading && (
          <>
            <section className='flex-wrap grid grid-cols-3'>
              <p className='grow-0 text-2xl text-gold font-medium truncate col-span-2'>
                {company.name}
              </p>
              <div className='flex justify-end items-center gap-5'>
                <div className='flex items-center gap-5'>
                  <Typography>Constitution date:</Typography>
                  <Chip
                    color='primary'
                    variant='outlined'
                    label={formatDate(company.constitutionDate ?? null)}
                  />
                </div>
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

                <Button
                  onClick={ToggleModalArchive}
                  sx={{
                    backgroundColor: colors.lightWhite,
                    ':hover': {
                      backgroundColor: colors.orangeChip,
                    },
                    height: '5px',
                  }}
                  startDecorator={<ArchiveOutlinedIcon sx={{ width: 24, color: colors.gold }} />}
                >
                  {' '}
                  <Typography sx={{ color: colors.gold }}>Archive</Typography>
                </Button>
              </div>
            </section>

            <section className='flex mt-8 justify-start gap-28'>
              <article className='flex gap-4'>
                <EmailOutlinedIcon />
                <p>{company.email}</p>
              </article>
              <article className='flex gap-4'>
                <AbcOutlinedIcon />
                <p>{company.rfc}</p>
              </article>
              <article className='flex gap-4'>
                <BusinessOutlinedIcon />
                <p>{company.taxResidence}</p>
              </article>
              <article className='flex gap-4'>
                <StayPrimaryPortraitOutlinedIcon />
                <p>{company.phoneNumber}</p>
              </article>
            </section>
          </>
        )}
        <Divider sx={{ 'margin-top': '30px' }} />
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
