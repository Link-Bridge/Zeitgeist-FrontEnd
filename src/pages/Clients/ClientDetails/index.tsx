import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import SnippetFolderOutlinedIcon from '@mui/icons-material/SnippetFolderOutlined';
import StayPrimaryPortraitOutlinedIcon from '@mui/icons-material/StayPrimaryPortraitOutlined';

import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import AddButton from '../../../components/common/AddButton';
import CardProject from '../../../components/common/CardProject';
import DeleteModal from '../../../components/common/DeleteModal';

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

type Props = {};

const index = (props: Props) => {
  const { clientId } = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const ToggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {}, [clientId]);

  return (
    <main className='bg-white rounded-xl p-6'>
      <DeleteModal
        ToggleModal={ToggleModal}
        open={open}
        setOpen={setOpen}
        title={'Delete Client'}
        description={'Are you sure you want to delete this client?'}
      ></DeleteModal>
      <section className='flex justify-between'>
        <h2 className='text-2xl text-gold font-medium'>Pollmann Mexico</h2>
        <section className='flex items-center gap-5'>
          <Chip size='lg' color='primary' variant='outlined'>
            01/01/2021
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

      <section className='flex gap-20 mt-7 font-montserrat'>
        <article className='flex gap-4 w-full'>
          <EmailOutlinedIcon />
          <p>nameemailtest@gmail.com</p>
        </article>
        <article className='flex gap-4 w-full'>
          <AbcOutlinedIcon />
          <p>VECJ880326</p>
        </article>
        <article className='flex gap-4 w-full'>
          <BusinessOutlinedIcon />
          <p>D.Social</p>
        </article>
      </section>
      <section className='flex gap-20 mt-5 mb-8'>
        <article className='flex gap-4 w-full'>
          <StayPrimaryPortraitOutlinedIcon />
          <p>(212)-456-7890</p>
        </article>
        <article className='flex gap-4 w-full'>
          <SnippetFolderOutlinedIcon />
          <p>Constitución</p>
        </article>
        <article className='flex gap-4 w-full'>
          <PersonPinOutlinedIcon />
          <p>test@gmail.com</p>
        </article>
      </section>

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
  );
};

export default index;