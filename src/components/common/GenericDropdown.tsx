import { Box, FormControl, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useState } from 'react';

interface GenericDropdownProps<T extends string | number>
  extends Omit<SelectProps<T>, 'onChange' | 'value'> {
  backgroundColor?: string;
  options: T[];
  selectedOption?: T;
  onValueChange: (value: T) => void;
  renderValue?: (value: T) => React.ReactNode;
  placeholder?: string;
  colorMap?: Record<T, string>;
}

/**
 * Generic dropdown component.
 *
 * @component
 * @template T - The type of the options in the dropdown
 *
 * @param props: Object - The component props
 * @param props.backgroundColor: string - The background color of the dropdown
 * @param props.options: T[] - The options to display in the dropdown
 * @param props.onValueChange: (value: T) => void - The callback function invoked
 *                                             when an option is selected
 * @param props.renderValue: (value: T) => React.ReactNode - Optional custom
 *                                        rendering function for selected value
 * @param props.placeholder: string - Optional placeholder text when no
 *                                    option is selected
 * @param props.colorMap: Record<T, string> - Optional color map for the
 *                                            options in the dropdown
 *
 * @returns {TSX.element} - The dropdown component
 */
const GenericDropdown = <T extends string | number>({
  backgroundColor,
  options,
  onValueChange,
  renderValue,
  placeholder,
  colorMap,
  selectedOption,
}: GenericDropdownProps<T>) => {
  const [option, setOptions] = useState<T | ''>(selectedOption || '');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (event: SelectChangeEvent<T>) => {
    const selectedOption = event.target.value as T;

    setOptions(selectedOption);
    onValueChange(selectedOption);
  };

  const handleOpen = () => {
    setIsEmpty(false);
  };

  return (
    <FormControl>
      <Select
        value={option}
        onChange={handleChange}
        onOpen={handleOpen}
        displayEmpty
        renderValue={
          renderValue ||
          (value => (
            <Box
              sx={{
                padding: '1px 10px',
                lineHeight: '30px',
                height: 30,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                minWidth: 150,
              }}
            >
              {String(value)}
            </Box>
          ))
        }
        sx={{
          borderRadius: 30,
          backgroundColor: colorMap?.[option as T] || backgroundColor || '#EDEDED',
          '& .MuiSelect-select': {
            padding: '1px 6px',
            fontSize: '0.875rem',
            textAlign: 'center',
            lineHeight: '30px',
            height: isEmpty ? 30 : 'auto',
            minHeight: 30,
            transition: 'height 0.2s ease',
            overflow: 'hidden',
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
