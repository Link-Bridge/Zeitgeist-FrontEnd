import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Option, Select, selectClasses } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import colors from '../../colors';

/**
 *  colorForStatus function
 * @description  returns color for status
 * @param status  string
 * @returns  string
 */

function colorForStatus(status: string) {
  switch (status) {
    case 'Select an option':
      return 'neutral';
    case 'Not Started':
      return colors.notStarted;
    case 'In Process':
      return colors.inProcess;
    case 'Under Revision':
      return colors.purple;
    case 'Delayed':
      return colors.delayed;
    case 'Postponed':
      return colors.blue;
    case 'Done':
      return colors.success;
    case 'Cancelled':
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
  value: string;
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
      <Option value='In Process'>In Process</Option>
      <Option value='Under Revision'>Under Revision</Option>
      <Option value='Delayed'>Delayed</Option>
      <Option value='Postponed'>Postponed</Option>
      <Option value='Done'>Done</Option>
      <Option value='Cancelled'>Cancelled</Option>
    </Chip>
  );
}
