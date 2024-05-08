import { Delete, Edit, MoreHoriz, MoreVert } from '@mui/icons-material';
import { Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';
import colors from '../../colors';

interface TaskActionsMenuProps {
  taskId: string;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

/**
 * TaskActionsMenu component
 *
 * @param taskId: string - Task ID
 * @param onEdit: (taskId: string) => void - Function to edit a task
 * @param onDelete: (taskId: string) => void - Function to delete a task
 *
 * @component
 * @returns {JSX.Element} - React component
 */
const TaskActionsMenu = ({ taskId, onEdit, onDelete }: TaskActionsMenuProps) => {
  const handleEdit = () => {
    onEdit(taskId);
  };

  const handleDelete = () => {
    onDelete(taskId);
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: MoreHoriz }}
        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
      >
        <MoreVert />
      </MenuButton>

      <Menu placement='bottom-end'>
        <MenuItem
          onClick={handleEdit}
          sx={{
            color: colors.gold,
          }}
        >
          <ListItemDecorator
            sx={{
              color: colors.gold,
            }}
          >
            <Edit />
          </ListItemDecorator>{' '}
          Edit
        </MenuItem>

        <MenuItem
          onClick={handleDelete}
          sx={{
            color: colors.gold,
          }}
        >
          <ListItemDecorator sx={{ color: colors.gold }}>
            <Delete />
          </ListItemDecorator>{' '}
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default TaskActionsMenu;
