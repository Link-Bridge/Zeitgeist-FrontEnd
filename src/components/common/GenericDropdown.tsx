import { CloseRounded, KeyboardArrowDown } from '@mui/icons-material';
import { Box, Chip, IconButton, Option, Select, selectClasses } from '@mui/joy';
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
  onChange: (newValue: string | null) => void;
  placeholder?: string;
  sx?: SxProps;
  disabled?: boolean;
  clearable?: boolean;
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
  const clearable = props.clearable ?? false;

  return (
    <div className='flex'>
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
          fontSize: '0.8rem',

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
      {clearable && props.value && (
        // display the button and remove select indicator
        // when user has selected a value
        <IconButton
          size='sm'
          variant='plain'
          color='neutral'
          onMouseDown={event => {
            // don't open the popup when clicking on this button
            event.stopPropagation();
          }}
          onClick={() => {
            props.onChange(null);
          }}
        >
          <CloseRounded />
        </IconButton>
      )}
    </div>
  );
}

export default GenericDropdown;
