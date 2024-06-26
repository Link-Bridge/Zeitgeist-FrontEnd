import { Chip } from '@mui/joy';
import colors from '../../../colors';
import { truncateText } from '../../../utils/methods';

const chipStyle = {
  bgcolor: colors.orangeChip,
  fontSize: '1rem',
  minWidth: '100px',
  padding: '0 10px',
  height: '30px',
};

export interface ChipWithLabelProps {
  label: string;
  content?: string | number;
}

const ChipWithLabel = ({ label, content }: ChipWithLabelProps) => {
  return (
    <div>
      <p>{label}</p>
      <Chip sx={chipStyle}>{truncateText(String(content), 20)}</Chip>
    </div>
  );
};

export default ChipWithLabel;
