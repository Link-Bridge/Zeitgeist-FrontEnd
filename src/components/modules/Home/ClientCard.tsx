import { Chip } from '@mui/joy';
import WorkIcon from '../../../assets/icons/work_filled.svg';
import colors from '../../../colors';
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
      <header className='mb-3 text-xl flex flex-nowrap'>
        <img src={WorkIcon} alt='Yellow Briefcase' className='mr-2' />
        <span className='overflow-hidden text-ellipsis' style={{ color: colors.darkGold }}>
          {name}
        </span>
      </header>
      <div className='flex flex-wrap'>
        <Chip
          sx={{
            bgcolor: colors.brownChip,
            fontSize: '13px',
            width: 'max-content',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          Chargeable Hours: {chargeableHours}
        </Chip>
      </div>
    </CardContainer>
  );
};

export default ClientCard;
