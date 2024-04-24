import { Chip } from '@mui/material';
import colors from '../../colors'; // Importar los colores del archivo colors.tsx

interface StatusChipProps {
  status: string;
}

function statusColor(status: string) {
  status = status.toUpperCase();

  switch (status) {
    case 'ACCEPTED':
      return colors.lightSuccess;
    case 'NOT STARTED':
      return colors.lightRed;
    case 'IN PROGRESS':
      return colors.warning;
    case 'UNDER REVISION':
      return colors.purple;
    case 'DELAYED':
      return colors.lightOrange;
    case 'POSTPONED':
      return colors.blue;
    case 'DONE':
      return colors.success;
    case 'CANCELLED':
      return colors.warning;
    case 'IN QUOTATION':
      return colors.darkBlue;
    default:
      return colors.null;
  }
}

function StatusChip(props: StatusChipProps) {
  return (
    <Chip
      label={props.status}
      style={{ backgroundColor: statusColor(props.status), color: 'black', fontSize: '1rem' }}
    />
  );
}

export default StatusChip;
