import { Sheet } from '@mui/joy';
import { styled } from '@mui/material/styles';

export const StyledSheet = styled(Sheet)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '0.6rem',
}));

export const Header = styled('h1')(({}) => ({
  color: '#686868',
  fontWeight: 'bold',
  margin: '10px 0',
}));

export const Item = styled(Sheet)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  borderRadius: 8,
}));
