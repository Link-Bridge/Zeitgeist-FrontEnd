import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';

interface GenericDropdownProps<T extends string | number> {
  backgroundColor?: string;
  options: T[];
  onSelect: (value: T) => void;
  renderValue?: (value: T) => React.ReactNode;
  placeholder?: string;
}

/**
 * Generic dropdown component.
 *
 * @component
 * @template T - The type of the options in the dropdown
 *
 * @param {Object} props - The component props
 * @param {string} [props.backgroundColor] - The background color of the
 *                                           dropdown
 * @param {T[]} props.options - The options to display in the dropdown
 * @param {(value: T) => void} props.onSelect - The callback function invoked
 *                                              when an option is selected
 * @param {(value: T) => React.ReactNode} [props.renderValue] - Optional custom
 *                                         rendering function for selected value
 * @param {string} [props.placeholder] - Optional placeholder text when no
 *                                       option is selected
 *
 * @returns {JSX.element} - The dropdown component
 */
const GenericDropdown = <T extends string | number>({
  backgroundColor,
  options,
  onSelect,
  renderValue,
  placeholder,
}: GenericDropdownProps<T>) => {
  const [option, setOptions] = useState<T | ''>('');

  const handleChange = (event: SelectChangeEvent<T>) => {
    const selectedOption = event.target.value as T;

    setOptions(selectedOption);
    onSelect(selectedOption);
  };

  return (
    <FormControl>
      <Select
        value={option}
        onChange={handleChange}
        displayEmpty
        renderValue={
          renderValue ||
          (value => (
            <Box
              sx={{
                padding: '1px 10px',
                lineHeight: '30px',
              }}
            >
              {String(value)}
            </Box>
          ))
        }
        sx={{
          borderRadius: 30,
          backgroundColor: backgroundColor || '#EDEDED',
          '& .MuiSelect-select': {
            padding: '1px 6px',
            fontSize: '0.875rem',
            textAlign: 'center',
            lineHeight: '30px',
          },
        }}
      >
        {placeholder && (
          <MenuItem value='' disabled>
            {placeholder}
          </MenuItem>
        )}

        {options.map(option => (
          <MenuItem key={String(option)} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenericDropdown;
