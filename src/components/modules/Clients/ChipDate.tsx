import { Chip } from '@mui/material';

interface ColorChipProps {
  label: string;
  color: string;
}

function ColorChip(props: ColorChipProps) {
  return (
    <Chip
      label={props.label}
      style={{ backgroundColor: props.color, color: 'black', fontSize: '1rem' }}
    />
  );
}

export default ColorChip;
