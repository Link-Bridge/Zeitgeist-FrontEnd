import { Chip } from '@mui/joy';
import colors from '../../../colors';

interface InfoChipProps {
  label: string;
  value: string | null;
}

const chipStyle = {
  bgcolor: colors.lighterGray,
  fontSize: '1rem',
  minWidth: '5px0px',
  textTransform: 'lowercase',
};

const InfoChip = ({ label, value }: InfoChipProps) => {
  if (value) {
    return (
      <div style={{ fontSize: '15px' }}>
        <p style={{ marginLeft: '7px' }}>{label}</p>
        <Chip sx={chipStyle}>{value}</Chip>
      </div>
    );
  } else {
    return null;
  }
};

export default InfoChip;
