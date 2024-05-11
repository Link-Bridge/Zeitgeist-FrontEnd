import { MoreVert, Search } from '@mui/icons-material';
import { IconButton, Input, Menu, MenuItem } from '@mui/joy';
import { useState } from 'react';
import colors from '../../colors';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
  options: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  options = [],
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (option?: string) => {
    if (option) {
      setSelectedOption(option);
      setSearchTerm('');
    }
    setAnchorEl(null);
  };

  return (
    <div className='flex items-center space-x-2 px-4 py-2'>
      <Input
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder={selectedOption || placeholder}
        startDecorator={<Search style={{ color: colors.gold }} />}
        sx={{
          width: 300,
          alignItems: 'center',
        }}
        endDecorator={
          <IconButton onClick={handleMenuClick} style={{ color: colors.gold }}>
            <MoreVert />
          </IconButton>
        }
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()}>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleMenuClose(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SearchBar;
