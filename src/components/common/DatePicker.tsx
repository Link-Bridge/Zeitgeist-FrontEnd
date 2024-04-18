import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';

const useStyles = makeStyles(theme => ({
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
}));

interface CustomDatePickerProps {
  value: Moment | null;
  onChange: (date: Moment | null) => void;
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

  const handleDateChange = (date: Moment | null) => {
    onChange(date ? moment(date).startOf('day') : null);
  };

  return (
    <DatePicker
      className={classes.datePicker}
      sx={{ focus: 'outlined-none' }}
      format='DD/MM/YYYY'
      value={value ? moment(value) : null}
      onChange={handleDateChange}
    />
  );
};

export default CustomDatePicker;
