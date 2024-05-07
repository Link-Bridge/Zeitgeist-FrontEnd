import { Chip } from '@mui/material';
import { statusChipColorCombination } from '../../colors';
import { ProjectStatus } from '../../types/project';

interface StatusChipProps {
  status: string;
}

const getStatusColor = (status: ProjectStatus) => {
  const statusColors = {
    [ProjectStatus.DONE]: statusChipColorCombination.done,
    [ProjectStatus.IN_QUOTATION]: statusChipColorCombination.inQuotation,
    [ProjectStatus.ACCEPTED]: statusChipColorCombination.accepted,
    [ProjectStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
    [ProjectStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss,
    [ProjectStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
    [ProjectStatus.DELAYED]: statusChipColorCombination.delayed,
    [ProjectStatus.POSTPONED]: statusChipColorCombination.postpone,
    [ProjectStatus.CANCELLED]: statusChipColorCombination.cancelled,
    [ProjectStatus.DEFAULT]: statusChipColorCombination.default,
  };

  return statusColors[status] || { font: 'black', bg: 'grey' };
};

function StatusChip(props: StatusChipProps) {
  const { bg, font } = getStatusColor(props.status as ProjectStatus);

  return (
    <Chip label={props.status} style={{ backgroundColor: bg, color: font, fontSize: '1rem' }} />
  );
}

export default StatusChip;
