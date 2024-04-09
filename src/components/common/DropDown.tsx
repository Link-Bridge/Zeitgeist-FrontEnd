import { ReactNode } from 'react';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import CheckIcon from '@mui/icons-material/Check';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';


export default function ClickableChip() {
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip
          variant="outlined"
          color="neutral"
          size="lg"
          startDecorator={<Avatar size="sm" src={`/static/images/avatar/1.jpg`} />}
          endDecorator={<CheckIcon fontSize="md" />}
          onClick={() => alert('You clicked the Joy Chip!')}
        >
          Mark
        </Chip>
      </Box>
    );
  }

