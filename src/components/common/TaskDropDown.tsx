import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Option, Select, selectClasses } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import colors from '../../colors';
import { TaskStatus } from '../../types/task-status';

/**
 *  colorForStatus function
 * @description  returns color for status
 * @param status  string
 * @returns  string
 */

function colorForStatus(status: TaskStatus) {
  switch (status) {
    case TaskStatus.SELECT_OPTION:
      return 'Neutral';
    case TaskStatus.NOT_STARTED:
      return colors.notStarted;
    case TaskStatus.IN_PROGRESS:
      return colors.darkPurple;
    case TaskStatus.UNDER_REVISION:
      return colors.purple;
    case TaskStatus.DELAYED:
      return colors.delayed;
    case TaskStatus.POSTPONED:
      return colors.blue;
    case TaskStatus.DONE:
      return colors.success;
    case TaskStatus.CANCELLED:
      return colors.danger;
    default:
      return 'neutral';
  }
}

/**
 * ClickableChip component for tasks
 * @description Chip component with Select component
 * @returns JSX.Element
 */

export default function ClickableChip({
  value,
  setValue,
}: {
  value: TaskStatus;
  setValue: (newVal: string) => void;
}) {
  return (
    <Chip
      component={Select}
      variant='solid'
      style={{ backgroundColor: colorForStatus(value) }}
      value={value}
      placeholder='Select an option'
      indicator={<KeyboardArrowDown />}
      onChange={(_, newVal) => setValue(String(newVal) ?? '')}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value='Not Started'>Not Started</Option>
      <Option value='In Progress'>In Progress</Option>
      <Option value='Under Revision'>Under Revision</Option>
      <Option value='Delayed'>Delayed</Option>
      <Option value='Postponed'>Postponed</Option>
      <Option value='Done'>Done</Option>
      <Option value='Cancelled'>Cancelled</Option>
    </Chip>
  );
}
