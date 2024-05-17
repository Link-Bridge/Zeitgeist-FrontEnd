import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Chip, Option, Select, selectClasses } from '@mui/joy';
import { useEffect, useState } from 'react';

interface ColorMapEntity {
  bg: string;
  font: string;
  bgHover?: string;
}

export interface GenericDropdownProps {
  defaultValue?: string;
  options: string[];
  values?: string[];
  colorMap?: Record<string, ColorMapEntity>;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

/**
 * Generic dropdown component
 *
 * @component
 * @param props: GenericDropdownProps - Allows customization of the dropdown
 * @returns TSX Component
 */
function GenericDropdown(props: GenericDropdownProps) {
  const [currentValue, setCurrentValue] = useState<string | null>(null);

  useEffect(() => {
    setCurrentValue(props.defaultValue ?? null);
  }, [props.defaultValue]);

  function handleChange(_: React.SyntheticEvent | null, newVal: unknown) {
    const val = String(newVal);
    setCurrentValue(val);
    props.onChange(val);
  }

  let colorCombination: ColorMapEntity = {
    bg: '#C4C4C4',
    bgHover: '#A0A0A0',
    font: '#424242',
  };

  if (props.colorMap) {
    colorCombination = props.colorMap[currentValue ?? ''] ?? colorCombination;
  }

  return (
    <Chip
      component={Select}
      indicator={<KeyboardArrowDown />}
      onChange={handleChange}
      value={currentValue}
      placeholder={props.placeholder}
      sx={{
        flex: 'none',
        bgcolor: colorCombination?.bg,
        color: colorCombination?.font,
        width: 240,
        fontSize: '1rem',

        [`&:hover`]: {
          bgcolor: colorCombination.bgHover,
        },
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Box sx={{ overflowY: 'auto', maxHeight: 300 }}>
        {props.options.map((option, i) => {
          return (
            <Option key={i} value={option}>
              {option}
            </Option>
          );
        })}
      </Box>
    </Chip>
  );
}

export default GenericDropdown;
