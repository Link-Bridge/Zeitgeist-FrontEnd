import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import ArchiveIcon from '@mui/icons-material/Archive';

/**
 *  OptionMenu component
 * @description Menu component with options: Edit and Archive
 * @returns  JSX.Element
 */

export default function OptionMenu() {
    return (
      <Dropdown>
        <MenuButton
          slots={{ root: MoreHorizIcon }}
          slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
        >
          <MoreVert />
        </MenuButton>
        <Menu placement="bottom-end">
          <MenuItem>
            <ListItemDecorator>
              <Edit />
            </ListItemDecorator>{' '}
            Edit 
          </MenuItem>
          <ListDivider />
          
          <MenuItem variant="soft" color="neutral">
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <ArchiveIcon />
            </ListItemDecorator>{' '}
            Archive
          </MenuItem>
        
        </Menu>
      </Dropdown>
    );
  }

