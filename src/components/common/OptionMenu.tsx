import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import Chip from '@mui/joy/Chip';

export default function PositionedMenu() {
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
          
          <MenuItem variant="soft" color="danger">
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <DeleteForever />
            </ListItemDecorator>{' '}
            Delete
          </MenuItem>
          
          <MenuItem variant="soft" color="danger">
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <DeleteForever />
            </ListItemDecorator>{' '}
            Delete
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }

