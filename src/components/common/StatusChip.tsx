import colors from '../../colors'; // Importar los colores del archivo colors.tsx
import { Chip } from '@mui/material';

interface StatusChipProps {
    status: string;
}
  
function statusColor(status: string) {
    switch (status) {
        case "Accepted":
            return colors.lightSuccess;
        case "Not Started":
            return colors.lightRed;
        case "In Progress":
            return colors.warning;
        case "Under Revision":
            return colors.purple;
        case "Delayed":
            return colors.lightOrange;
        case "Postponed":
            return colors.blue;
        case "Done":
            return colors.success;
        case "Cancelled":
            return colors.warning;
        case "In quotation":
            return colors.darkBlue
        default:
            return colors.null;
    }
  }

function StatusChip(status: StatusChipProps) {
  return (
    <Chip label = {status.status}
    style={{ backgroundColor: statusColor(status.status), color: "black" }}/>
  );
}

export default StatusChip;
