import { SelectProps } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const useStyles = makeStyles({
  datePicker: {
    background: '#F0F0F0',
    borderRadius: '12px',
    padding: '6px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#BDBDBD',
    '& .MuiInputBase-root': {
      flex: '1',
      fontSize: '12px',
      '& .MuiButtonBase-root': {
        padding: 0,
        paddingLeft: 10,
      },
    },
    '& .MuiInputBase-input': {
      padding: 15,
      paddingLeft: 8,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none !important',
    },
  },
});

interface CustomDatePickerProps extends Omit<SelectProps<dayjs.Dayjs>, 'onChange' | 'value'> {
  value: dayjs.Dayjs | null;
  onChange: (date: dayjs.Dayjs | null) => void;
}

/**
 * Custom date picker component
 *
 * @component
 *
 * @param props: Object - The component props
 * @returns
 */
const CustomDatePicker = ({ value, onChange }: CustomDatePickerProps) => {
  const classes = useStyles();

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    onChange(date);
  };

  return (
    <DatePicker
      className={classes.datePicker}
      sx={{ focus: 'outlined-none' }}
      format='DD/MM/YYYY'
      value={value}
      onChange={handleDateChange}
    />
  );
};

export default CustomDatePicker;
