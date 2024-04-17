import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';

interface GenericDropdownProps {
  backgroundColor?: string;
  options: string[];
}

const GenericDropdown = ({ backgroundColor, options }: GenericDropdownProps) => {
  const [option, setOption] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as string);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Box
          sx={{
            borderRadius: 12,
            height: 30,
            backgroundColor: backgroundColor || 'inherit',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Select
            value={option}
            onChange={handleChange}
            label='Option'
            sx={{
              padding: '5px 8px',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
            renderValue={selected => (
              <Box
                sx={{
                  color: 'black',
                  padding: '5px 10px',
                  lineHeight: '30px',
                }}
              >
                {selected}
              </Box>
            )}
          >
            {options.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
    </div>
  );
};

export default GenericDropdown;
