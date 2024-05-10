import { Search } from '@mui/icons-material';
import { IconButton, Input } from '@mui/joy';
import { Collapse } from '@mui/material';
import colors from '../../colors';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isSearchVisible: boolean;
  setIsSearchVisible: (visible: boolean) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  isSearchVisible,
  setIsSearchVisible,
  placeholder,
}) => {
  const handleSearchIconClick = () => {
    setIsSearchVisible(prevState => !prevState);
  };

  return (
    <div className='flex justify-end items-center space-x-2 px-4 py-2'>
      <IconButton onClick={handleSearchIconClick} size='lg'>
        <Search
          className='text-5xl transition-transform transform-gpu hover:rotate-90 duration-500 ease-in-out'
          style={{ color: colors.gold }}
        />
      </IconButton>
      <Collapse in={isSearchVisible} orientation='horizontal' timeout={{ enter: 500, exit: 300 }}>
        <Input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          sx={{
            width: isSearchVisible ? 200 : 0,
            transition: 'width 200ms ease-in-out',
            marginLeft: '8px',
            marginBottom: '16px',
            alignItems: 'center',
          }}
        />
      </Collapse>
    </div>
  );
};

export default SearchBar;
