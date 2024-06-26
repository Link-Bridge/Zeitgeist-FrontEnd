import { Chip } from '@mui/joy';

interface ColorChipProps {
  label: string;
  color: string;
}

function ColorChip(props: ColorChipProps) {
  return (
    <Chip
      style={{ backgroundColor: props.color, color: 'black', fontSize: '1rem', maxWidth: '100%' }}
    >
      {props.label}
    </Chip>
  );
}

export default ColorChip;
