import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/joy/Chip';

import { Option, Select, selectClasses } from '@mui/joy';

export default function ClickableChip() {
  return (
    <Chip
      component={Select}
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
      <Option value={'Hola'}>Hola</Option>
    </Chip>
  );
}
