import { useEffect, useState } from 'react';

import useHttp from '../../../hooks/useHttp';
import { CompanyEntity } from '../../../types/company';
import { Response } from '../../../types/response';
import { RequestMethods } from '../../../utils/constants';

const Items = [
  { projectId: 1, projectTitle: 'sadsadsadsad', status: 'Done', department: 'Accounting' },
  { projectId: 2, projectTitle: 'sadsadsadsad', status: 'In process', department: 'Legal' },
  { projectId: 3, projectTitle: 'sadsadsadsad', status: 'Delayed', department: 'Legal' },
  { projectId: 4, projectTitle: 'sadsadsadsad', status: 'In quotation', department: 'Legal' },
  { projectId: 5, projectTitle: 'sadsadsadsad', status: 'Under Revision', department: 'Legal' },
  { projectId: 6, projectTitle: 'sadsadsadsad', status: 'Done', department: 'Legal' },
  { projectId: 7, projectTitle: 'sadsadsadsad', status: 'Done', department: 'Legal' },
  { projectId: 8, projectTitle: 'sadsadsadsad', status: 'Done', department: 'Legal' },
  { projectId: 9, projectTitle: 'sadsadsadsad', status: 'Done', department: 'Legal' },
];

// const company = {
//   name: 'Pollmann Mexico',
//   created_at: '24/01/2000',
//   email: 'nameemailtest@gmail.com',
//   rfc: 'VECJ880326',
//   mexican_address: 'Direccion Fiscal',
//   phone_number: '(212)-456-7890',
//   constitution_date: '24/01/2000',
// };

type ClientDetailProps = {
  clientId: string;
};

const index = ({ clientId }: ClientDetailProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, error, loading, sendRequest } = useHttp<Response<CompanyEntity>>(
    `/company/${clientId}`,
    RequestMethods.GET
  );

  // const company: CompanyEntity = data && data.data ? data.data.flat() : {};

  const ToggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    sendRequest();
    console.log(data);
  }, [data]);

  return <h1>s</h1>;

  /*  return (
    <main className='bg-white rounded-xl p-6'>
      <DeleteModal
        ToggleModal={ToggleModal}
        open={open}
        setOpen={setOpen}
        title={'Delete Client'}
        description={'Are you sure you want to delete this client?'}
      ></DeleteModal>
      {data && !loading && company && (
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
              <p>{company.phone_number}</p>
            </article>
            <article className='flex gap-4 w-1/3'>
              <SnippetFolderOutlinedIcon />
              <p>{company.constitution_date}</p>
            </article>
          </section>
        </>
      )}

      <Divider />

      <section className='mt-8'>
        <section className='flex justify-between items-center'>
          <h3 className='text-[20px] text-[#424242] font-medium'>Projects</h3>
          <section className='flex gap-5'>
            <Dropdown>
              <MenuButton variant='solid' endDecorator={<ArrowDropDown />}>
                Size
              </MenuButton>
              <Menu sx={{ minWidth: 160, '--ListItemDecorator-size': '24px' }}>
                <MenuItem>Smaller</MenuItem>
                <MenuItem>Larger</MenuItem>
              </Menu>
            </Dropdown>
            <AddButton>Test</AddButton>
          </section>
        </section>

        <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 rounded-xl mt-6'>
          {Items.map(project => (
            <CardProject
              key={project.projectId}
              projectTitle={project.projectTitle}
              status={project.status}
              department={project.department}
            />
          ))}
        </section>
      </section>
    </main>
  ); */
};

export default index;
