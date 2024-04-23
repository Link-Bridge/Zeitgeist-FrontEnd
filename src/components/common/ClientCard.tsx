import { Chip } from '@mui/joy';
import WorkIcon from '../../assets/icons/work_filled.svg';
import CardContainer from './CardContainer';
import colors from '../../colors';

/**
 * @brief Displays and organizes client information.
 * @param ClientCardProps props: properties of a client information
 * @return CardContainer and the visual elements that
 * organize each client information
 */

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
                bgcolor: colors.orangeChip,
                fontSize: '13px',
            }}>Accounting Hours: {accountingHours}</Chip>
            <Chip sx={{
                bgcolor: colors.orangeChip
            }}>Legal Hours: {legalHours}</Chip>
            <Chip sx={{
                bgcolor: colors.brownChip,
                fontSize: '13px',
            }}>Chargeable Hours: {chargeableHours}</Chip>
            <Chip sx={{
                bgcolor: colors.blueChip,
                color:'#0B6BCB',
                border: '1px solid #97C3F0',
                fontSize: '13px',
            }}>Total Projects: {totalProjects}</Chip>
        </div>
    </CardContainer>
    
  )
}

export default ClientCard;

