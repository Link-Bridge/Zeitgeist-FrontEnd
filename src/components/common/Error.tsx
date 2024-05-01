import { Typography } from '@mui/joy';
import { colors } from '@mui/material';

interface ErrorViewProps<T> {
  error: T;
}

/**
 * Displays the errors in a nice way to the user
 *
 * @component
 *
 * @param {string} error - The error message to display
 * @returns {JSX.Element} - React component
 */
const ErrorView = <T,>({ error }: ErrorViewProps<T>): JSX.Element => {
  return (
    <>
      <Typography
        level='h1'
        variant='plain'
        sx={{
          color: colors.grey[800],
          fontWeight: 600,
          fontSize: '1.5rem',
        }}
      >
        Error
      </Typography>

      <Typography level='h3' component='p'>
        {String(error)}
      </Typography>
    </>
  );
};

export default ErrorView;
