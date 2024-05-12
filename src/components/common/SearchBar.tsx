import { MoreVert, Search } from '@mui/icons-material';
import { IconButton, Input, Menu, MenuItem } from '@mui/joy';
import { useState } from 'react';
import colors from '../../colors';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
  options?: string[];
  setSelectedOption: (option: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  options = [],
  setSelectedOption,
}) => {
  const [selectedOption, setSelectedOptionState] = useState(
    options.length > 0 ? options[0] : 'Search'
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (option: string) => {
    setSelectedOptionState(option);
    setSelectedOption(option);
    setAnchorEl(null);
  };

  return (
    <div className='flex items-center space-x-2'>
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
          options.length > 0 && (
            <IconButton onClick={handleMenuClick} style={{ color: colors.gold }}>
              <MoreVert />
            </IconButton>
          )
        }
      />
      {options.length > 0 && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose(selectedOption)}
        >
          {options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleMenuClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default SearchBar;
