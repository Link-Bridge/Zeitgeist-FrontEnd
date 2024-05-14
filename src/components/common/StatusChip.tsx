import { Chip } from '@mui/joy';
import { statusChipColorCombination } from '../../colors';
import { ProjectStatus } from '../../types/project';

interface StatusChipProps {
  status: string;
}

const getStatusColor = (status: ProjectStatus) => {
  const statusColors: Record<ProjectStatus, typeof statusChipColorCombination.accepted> = {
    [ProjectStatus.DONE]: statusChipColorCombination.done,
    [ProjectStatus.IN_QUOTATION]: statusChipColorCombination.inQuotation,
    [ProjectStatus.ACCEPTED]: statusChipColorCombination.accepted,
    [ProjectStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
    [ProjectStatus.IN_PROGRESS]: statusChipColorCombination.inProgress,
    [ProjectStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
    [ProjectStatus.DELAYED]: statusChipColorCombination.delayed,
    [ProjectStatus.POSTPONED]: statusChipColorCombination.postponed,
    [ProjectStatus.CANCELLED]: statusChipColorCombination.cancelled,
    [ProjectStatus.NONE]: statusChipColorCombination.default,
  };

  return statusColors[status] || { font: 'black', bg: 'grey' };
};

function StatusChip(props: StatusChipProps) {
  const { bg, font } = getStatusColor(props.status as ProjectStatus);

  return (
    <Chip style={{ backgroundColor: bg, color: font, fontSize: '1rem' }}> {props.status}</Chip>
  );
}

export default StatusChip;
