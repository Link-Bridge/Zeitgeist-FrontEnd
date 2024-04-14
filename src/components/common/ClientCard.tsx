import { Chip } from '@mui/joy';
import { useState } from 'react';
import CardContainer from './CardContainer';
// import WorkIcon from "../../assets/icons/work_filled.svg"
import DeleteModal from '../../components/common/DeleteModal';

interface ClientCardProps {
  name: string;
  accountingHours: number;
  legalHours: number;
  chargeableHours: number;
  totalProjects: number;
}

const ClientCard = ({
  name,
  accountingHours,
  legalHours,
  chargeableHours,
  totalProjects,
}: ClientCardProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const ToggleModal = () => {
    setOpen(!open);
    console.log('asdasd');
  };

  return (
    <CardContainer>
      <DeleteModal
        ToggleModal={ToggleModal}
        open={open}
        setOpen={setOpen}
        title={'Delete Client'}
        description={'Are you sure you want to delete this client?'}
      ></DeleteModal>
      <header className='mb-3 text-xl flex'>
        <img src={''} alt='Yellow Briefcase' className='mr-2' /> {name}
      </header>
      <div className='grid grid-cols-2 gap-2'>
        <Chip
          sx={{
            bgcolor: '#EAD3AA',
          }}
        >
          Accounting Hours: {accountingHours}
        </Chip>
        <Chip
          sx={{
            bgcolor: '#EAD3AA',
          }}
        >
          Legal Hours: {legalHours}
        </Chip>
        <Chip
          sx={{
            bgcolor: '#B39C844C',
          }}
        >
          Chargeable Hours: {chargeableHours}
        </Chip>
        <Chip
          sx={{
            bgcolor: '#E3EFFB',
            color: '#0B6BCB',
            border: '1px solid #97C3F0',
          }}
        >
          Total Projects: {totalProjects}
        </Chip>
        <button
          className='bg-red-200'
          onClick={() => {
            ToggleModal();
          }}
        >
          Test
        </button>
      </div>
    </CardContainer>
  );
};

export default ClientCard;
