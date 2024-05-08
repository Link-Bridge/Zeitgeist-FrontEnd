import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import ArchiveModal from '../../../components/common/ArchiveModal';
// import DeleteModal from '../../../components/common/DeleteModal';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { Response } from '../../../types/response';
import { RequestMethods } from '../../../utils/constants';
import { ProjectsClientList } from '../../Projects/ProjectsClientList';

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';
import { Box } from '@mui/joy';
import { useParams } from 'react-router-dom';
import GoBack from '../../../components/common/GoBack';
import EditClientFormModal from '../../../components/modules/Clients/EditClientFormModal';
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
  const { clientId } = useParams();
  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  // Hay que arreglar esto después
  // const handleArchiveClient = () => {
  //   // update ui
  //   setFilteredClientsData(prev => {
  //     const aux = [];

  //     for (let i = 0; i < prev.length; i++) {
  //       if (prev[i].id !== company?.id) {
  //         aux.push(prev[i]);
  //         continue;
  //       }
  //       aux.push({
  //         ...prev[i],
  //         archived: !prev[i].archived,
  //       });
  //     }

  //     return aux;
  //   });
  // };

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  useEffect(() => {
    if (data && data.data) {
      setCompany(data.data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const ToggleModalArchive = () => setOpenArchive(!openArchive);
  // const ToggleModalDelete = () => setOpenDelete(!openDelete)

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      <main className='bg-white rounded-xl p-6'>
        <ArchiveModal
          toggleModal={ToggleModalArchive}
          open={openArchive}
          setOpen={setOpenArchive}
          id={company?.id ?? ''}
          title={`${company?.archived ? 'Unarchive' : 'Archive'}`}
          description={`Are you sure you want to ${company?.archived ? 'unarchive' : 'archive'} this client?`}
          handleArchiveClient={() => {
            return '';
          }}
        ></ArchiveModal>
        {company && !loading && (
          <section className='flex justify-between'>
            <h2 className='text-2xl text-gold font-medium'>{company.name}</h2>
            <section className='flex items-center gap-5'>
              <Chip
                color='primary'
                variant='outlined'
                label={formatDate(company.constitutionDate ?? null)}
              />
              <EditOutlinedIcon
                sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
                className='text-gold'
                onClick={handleEditClick}
              />
              {company && (
                <EditClientFormModal
                  open={editModalOpen}
                  setOpen={setEditModalOpen}
                  clientData={company}
                  setRefetch={setRefetch}
                />
              )}
              <ArchiveOutlinedIcon
                sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
                className='text-gold'
                onClick={ToggleModalArchive}
              />
              {/* <DeleteOutlineOutlinedIcon
              sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
              className='text-gold'
              onClick={() => {
                ToggleModalDelete();
              }}
            /> */}
            </section>
          </section>
        )}

        {!loading && company && (
          <>
            <section className='flex mt-8 font-montserrat justify-start gap-28'>
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
        <ProjectsClientList clientId={clientId ?? ''} />
      </main>
    </>
  );
};

export default ClientDetails;
