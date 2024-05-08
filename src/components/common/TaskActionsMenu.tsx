import { Delete, Edit, MoreVert } from '@mui/icons-material';
import { Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';
import colors from '../../colors';
import { Task } from '../../types/task';

interface TaskActionsMenuProps {
  task: Task;
  onEdit: (taskId: string) => void;
  onOpenDeleteDialog: (task: Task) => void;
}

const TaskActionsMenu = ({ task, onEdit, onOpenDeleteDialog }: TaskActionsMenuProps) => {
  const handleEdit = () => {
    onEdit(task.id);
  };

  const handleDelete = () => {
    onOpenDeleteDialog(task);
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: MoreVert }}
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
