import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/joy/Chip';
import { Option, Select, selectClasses } from '@mui/joy';
import colors from '../../colors';
import { useState } from 'react'; 


/**
 * ClickableChip component
 * @description Chip component with Select component
 * @returns JSX.Element
 */

function colorForStatus(status: string) {
  switch (status) {
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
      return "neutral";
  }
}

export default function ClickableChip(status: string) {
  const [value, setValue] = useState("not started")
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Chip
      component={Select}
      variant='solid'
      label={status}
      style={{backgroundColor: colorForStatus(status)}}
      value={value}
      placeholder="Select an option"
      indicator={<KeyboardArrowDown />}
      
      onChange={(event) => handleChange(event.target.value as string)}

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

