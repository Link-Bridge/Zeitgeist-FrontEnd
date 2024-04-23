import { useEffect, useState } from 'react';
import DeleteModal from '../../../components/common/DeleteModal';
import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { Response } from '../../../types/response';
import { RequestMethods } from '../../../utils/constants';

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';

import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';

type ClientDetailProps = {
  clientId: string;
};

const ClientDetails = ({ clientId }: ClientDetailProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [company, setCompany] = useState<CompanyEntity | null>(null);
  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );

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
            <Chip size='lg' color='primary' variant='outlined'>
              {company.created_at}
            </Chip>
            <EditOutlinedIcon
              sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
              className='text-gold'
            />
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
          <section className='flex mt-7 font-montserrat'>
            <article className='flex gap-4 w-full'>
              <EmailOutlinedIcon />
              <p>{company.email}</p>
            </article>
            <article className='flex gap-4 w-full'>
              <AbcOutlinedIcon />
              <p>{company.rfc}</p>
            </article>
            <article className='flex gap-4 w-full'>
              <BusinessOutlinedIcon />
              <p>{company.mexican_address}</p>
            </article>
          </section>
          <section className='flex mt-5 mb-8'>
            <article className='flex gap-4 w-1/3'>
              <StayPrimaryPortraitOutlinedIcon />
              <p>{company.phoneNumber}</p>
            </article>
            <article className='flex gap-4 w-1/3'>
              <SnippetFolderOutlinedIcon />
              <p>{company.constitution_date}</p>
            </article>
          </section>
        </>
      )}
      <Divider />
    </main>
  );
};

export default ClientDetails;
