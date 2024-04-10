import { ReactNode } from 'react';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import { Option, Select } from '@mui/joy';


export default function ClickableChip() {
    return (
    
        <Chip component={Select} indicator>
          <Option value={"Hola"}> Hola</Option>
        </Chip>

    );
  }

