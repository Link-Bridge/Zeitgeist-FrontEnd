import { Chip } from '@mui/joy';
import { statusChipColorCombination } from '../../../colors';
import { ExpenseReportStatus } from '../../../types/expense';

interface StatusChipProps {
  status: string;
}

const getStatusColor = (status: ExpenseReportStatus) => {
  const statusColors: Record<ExpenseReportStatus, typeof statusChipColorCombination.accepted> = {
    [ExpenseReportStatus.ACCEPTED]: statusChipColorCombination.accepted,
    [ExpenseReportStatus.PAYED]: statusChipColorCombination.done,
    [ExpenseReportStatus.PENDING]: statusChipColorCombination.inProgress,
    [ExpenseReportStatus.REJECTED]: statusChipColorCombination.cancelled,
    [ExpenseReportStatus.NONE]: statusChipColorCombination.default,
  };

  return statusColors[status] || { font: 'black', bg: 'grey' };
};

function StatusChip(props: StatusChipProps) {
  const { bg, font } = getStatusColor(props.status as ExpenseReportStatus);

  return (
    <Chip style={{ backgroundColor: bg, color: font, fontSize: '1rem' }}> {props.status}</Chip>
  );
}

export default StatusChip;
