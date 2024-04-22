import { Chip } from '@mui/joy';
import WorkIcon from '../../assets/icons/work_filled.svg';
import CardContainer from './CardContainer';

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
  return (
    <CardContainer>
        <header className='mb-3 text-xl flex'>
            <img src={WorkIcon} alt="Yellow Briefcase" className="mr-2" /> {name}
        </header>
        <div className='grid grid-cols-2 gap-2'>
            <Chip sx={{
                bgcolor:'#EAD3AA',
                fontSize: '13px',
            }}>Accounting Hours: {accountingHours}</Chip>
            <Chip sx={{
                bgcolor: '#EAD3AA'
            }}>Legal Hours: {legalHours}</Chip>
            <Chip sx={{
                bgcolor:'#B39C844C',
                fontSize: '13px',
            }}>Chargeable Hours: {chargeableHours}</Chip>
            <Chip sx={{
                bgcolor:'#E3EFFB',
                color:'#0B6BCB',
                border: '1px solid #97C3F0',
                fontSize: '13px',
            }}>Total Projects: {totalProjects}</Chip>
        </div>
    </CardContainer>
    
  )
}

export default ClientCard