import { makeStyles } from '@mui/styles';
import { DatePicker } from '@mui/x-date-pickers';

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

const CustomDatePicker = () => {
  const classes = useStyles();

  return (
    <DatePicker
      className={classes.datePicker}
      sx={{ focus: 'outlined-none' }}
      format='DD/MM/YYYY'
    />
  );
};

export default CustomDatePicker;
