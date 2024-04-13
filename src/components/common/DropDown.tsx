import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/joy/Chip';
import { Option, Select, selectClasses } from '@mui/joy';
import colors from '../../colors';

/**
 * ClickableChip component
 * @description Chip component with Select component
 * @returns JSX.Element
 */


export default function ClickableChip() {
  return (
    <Chip
      component={Select}
      placeholder="Select an option"
      indicator={<KeyboardArrowDown />}
      sx={{
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value={'Not Started'} style={{backgroundColor: colors.notStarted}} >Not Started</Option>
      <Option value={'In Process'} style={{backgroundColor: colors.inProcess}}>In Progress</Option>
      <Option value={'Under Revision'} style={{backgroundColor: colors.purple}}>Under Revision</Option>
      <Option value={'Delayed'} style={{backgroundColor: colors.delayed}}>Delayed</Option>
      <Option value={'Postponed'} style={{backgroundColor: colors.blue}}>Postponed</Option>
      <Option value={'Done'} style={{backgroundColor: colors.success}}>Done</Option>
      <Option value={'Cancelled'} style={{backgroundColor: colors.danger}}>Cancelled</Option>

    </Chip>
  );
}

