import { Chip } from '@mui/joy';
import WorkIcon from '../../../assets/icons/work_filled.svg';
import colors from '../../../colors';
import { truncateText } from '../../../utils/methods';
import CardContainer from '../../common/CardContainer';

/**
 * @brief Displays and organizes client information.
 * @param ClientCardProps props: properties of a client information
 * @return CardContainer and the visual elements that
 * organize each client information
 */

interface ClientCardProps {
  name: string;
  chargeableHours: number;
}

const ClientCard = ({ name, chargeableHours }: ClientCardProps) => {
  return (
    <CardContainer>
      <header className='mb-3 text-xl flex'>
        <img src={WorkIcon} alt='Yellow Briefcase' className='mr-2' />
        <span style={{ color: colors.darkGold, wordBreak: 'break-all' }}>{truncateText(name)}</span>
      </header>
      <div className='grid grid-cols-2 gap-2'>
        <Chip
          sx={{
            bgcolor: colors.brownChip,
            fontSize: '13px',
            width: 'max-content',
          }}
        >
          Chargeable Hours: {chargeableHours}
        </Chip>
      </div>
    </CardContainer>
  );
};

export default ClientCard;
