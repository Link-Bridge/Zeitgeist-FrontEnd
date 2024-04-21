import ArchiveIcon from '@mui/icons-material/Archive';
import Edit from '@mui/icons-material/Edit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVert from '@mui/icons-material/MoreVert';
import Dropdown from '@mui/joy/Dropdown';
import ListDivider from '@mui/joy/ListDivider';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

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
      <Menu placement='bottom-end'>
        <MenuItem>
          <ListItemDecorator>
            <Edit />
          </ListItemDecorator>{' '}
          Edit
        </MenuItem>
        <ListDivider />

        <MenuItem variant='soft' color='neutral'>
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <ArchiveIcon />
          </ListItemDecorator>{' '}
          Archive
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
