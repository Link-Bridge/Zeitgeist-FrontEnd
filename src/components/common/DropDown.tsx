import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/joy/Chip';
import { Option, Select, selectClasses } from '@mui/joy';

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
      <Option value={'Not Started'}>Not Started</Option>
      <Option value={'In Progress'}>In Progress</Option>
      <Option value={'Under Revision'}>Under Revision</Option>
      <Option value={'Delayed'}>Delayed</Option>
      <Option value={'Postponed'}>Postponed</Option>
      <Option value={'Done'}>Done</Option>
      <Option value={'Cancelled'}>Cancelled</Option>

    </Chip>
  );
}

