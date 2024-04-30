import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import DeleteModal from '../../../components/common/DeleteModal';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { Response } from '../../../types/response';
import { RequestMethods } from '../../../utils/constants';
import { ProjectsClientList } from '../../Projects/ProjectsClientList';

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';
import EditClientFormModal from '../../../components/modules/Clients/EditClientFormModal';

type ClientDetailProps = {
  clientId: string;
};

const formatDate = (date: Date) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString(options);
  return formattedDate;
};

/**
 * Client Details Page page
 *
 * @component
 * @param {ClientDetailProps} props - Page props
 * @param {string} props.clientId - The id of the client
 *
 * @returns {JSX.Element} Client details page
 */

const ClientDetails = ({ clientId }: ClientDetailProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [company, setCompany] = useState<CompanyEntity | null>(null);
  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  useEffect(() => {
    sendRequest();
  }, []);

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

  const ToggleModal = () => {
    setOpen(!open);
  };

  return (
    <main className='bg-white rounded-xl p-6'>
      <DeleteModal
        ToggleModal={ToggleModal}
        open={open}
        setOpen={setOpen}
        title={'Delete Client'}
        description={'Are you sure you want to delete this client?'}
      ></DeleteModal>
      {company && !loading && (
        <section className='flex justify-between'>
          <h2 className='text-2xl text-gold font-medium'>{company.name}</h2>
          <section className='flex items-center gap-5'>
            <Chip
              size='lg'
              color='primary'
              variant='outlined'
              label={formatDate(company.constitutionDate)}
            />
            <EditOutlinedIcon
              sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
              className='text-gold'
              onClick={handleEditClick} // Attach the handler here
            />
            {company && (
              <EditClientFormModal
                open={editModalOpen}
                setOpen={setEditModalOpen}
                clientData={company} // Pass the client data to the modal
                setRefetch={() => {}}
              />
            )}
            <ArchiveOutlinedIcon
              sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
              className='text-gold'
            />
            <DeleteOutlineOutlinedIcon
              sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
              className='text-gold'
              onClick={() => {
                ToggleModal();
              }}
            />
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
      <ProjectsClientList clientId={clientId} />
    </main>
  );
};

export default ClientDetails;
