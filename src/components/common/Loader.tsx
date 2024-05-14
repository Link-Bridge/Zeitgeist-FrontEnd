import { Box, CircularProgress } from '@mui/joy';

export default function Loader() {
  return (
    <Box
      className='col-span-full'
      sx={{ display: 'flex', justifyContent: 'center', justifySelf: 'center' }}
    >
      <CircularProgress />
    </Box>
  );
}
