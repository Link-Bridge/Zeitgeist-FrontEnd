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
  maxLength?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  placeholder,
  options = [],
  setSelectedOption,
  maxLength,
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
    <div className='flex items-center space-x-2 w-full'>
      <div className='flex items-center space-x-2 w-full'>
        <Input
          className='w-full'
          value={searchTerm}
          onChange={e => {
            if (!maxLength || e.target.value.length <= maxLength) {
              setSearchTerm(e.target.value);
            }
          }}
          placeholder={selectedOption || placeholder}
          startDecorator={<Search style={{ color: colors.gold }} />}
          sx={{
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
    </div>
  );
};

export default SearchBar;
