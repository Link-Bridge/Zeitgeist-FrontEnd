import { KeyboardArrowDown } from '@mui/icons-material';
import { Box, Chip, Option, Select, selectClasses } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';

interface ColorMapEntity {
  bg: string;
  font: string;
  bgHover?: string;
}

export interface GenericDropdownProps {
  options: string[];
  values?: string[];
  value: string | null;
  colorMap?: Record<string, ColorMapEntity>;
  onChange: (newValue: string) => void;
  placeholder?: string;
  sx?: SxProps;
  disabled?: boolean;
}

/**
 * Generic dropdown component
 *
 * @component
 * @param props: GenericDropdownProps - Allows customization of the dropdown
 * @returns TSX Component
 */
function GenericDropdown(props: GenericDropdownProps) {
  let colorCombination: ColorMapEntity = {
    bg: '#C4C4C4',
    bgHover: '#A0A0A0',
    font: '#424242',
  };

  if (props.colorMap) {
    colorCombination = props.value ? props.colorMap[props.value] : colorCombination;
  }

  const values = props.values ?? props.options;

  return (
    <Chip
      component={Select}
      indicator={<KeyboardArrowDown />}
      onChange={(_, newVal) => props.onChange(newVal as string)}
      value={props.value}
      placeholder={props.placeholder}
      disabled={props.disabled ?? false}
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
        ...props.sx,
      }}
    >
      <Box sx={{ overflowY: 'auto', maxHeight: 300 }}>
        {props.options.map((option, i) => {
          return (
            <Option key={i} value={values[i]}>
              {option}
            </Option>
          );
        })}
      </Box>
    </Chip>
  );
}

export default GenericDropdown;
