import { Box } from '@mui/joy';
import { FormControl, MenuItem, Select, SelectChangeEvent, SelectProps } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface ColorMapEntity {
  bg: string;
  font: string;
}

interface GenericDropdownProps<T extends string | number>
  extends Omit<SelectProps<T>, 'onChange' | 'value'> {
  backgroundColor?: string;
  options: T[];
  onValueChange: (value: T) => void;
  renderValue?: (value: T) => React.ReactNode;
  placeholder?: string;
  colorMap?: Record<T, ColorMapEntity>;
  defaultValue?: T;
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
 * @param props.defaultValue: T - Optional default value for the dropdown
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
  defaultValue,
}: GenericDropdownProps<T>) => {
  const [option, setOptions] = useState<T | ''>(defaultValue ?? '');
  const [isEmpty, setIsEmpty] = useState(true);

  const handleChange = (event: SelectChangeEvent<T>) => {
    const selectedOption = event.target.value as T;

    setOptions(selectedOption);
    onValueChange(selectedOption);
  };

  const handleOpen = () => {
    setIsEmpty(false);
  };

  const renderValueWithColor = (value: T) => {
    const isPlaceholder = !value;

    const colorCombination = colorMap?.[value];

    return (
      <Box
        sx={{
          backgroundColor: colorCombination?.bg || (isPlaceholder ? 'transparent' : undefined),
          color: colorCombination?.font || (isPlaceholder ? 'gray' : undefined),
          borderRadius: 30,
          padding: '0 12px',
          fontSize: '0.875rem',
          lineHeight: '30px',
          height: isPlaceholder ? 30 : 'auto',
          minWidth: 150,
          whiteSpace: 'nowrap',
        }}
      >
        {isPlaceholder ? placeholder : value}
      </Box>
    );
  };

  useEffect(() => {
    setOptions(defaultValue ?? '');
  }, [defaultValue]);

  return (
    <FormControl>
      <Select
        value={option}
        onChange={handleChange}
        onOpen={handleOpen}
        displayEmpty
        renderValue={renderValue || renderValueWithColor}
        sx={{
          borderRadius: 30,
          background: option && colorMap?.[option]?.bg || backgroundColor || 'transparent',
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

          '& .MuiMenu-paper': {
            borderRadius: 8,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
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
