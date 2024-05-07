import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { ReactNode } from 'react';

/**
 * @brief background card
 * @param children child element that contains elements needed
 * @return card used as background
 */

interface CardContainerProps {
  children: ReactNode;
}

export default function CardContainer({ children }: CardContainerProps) {
  return (
    <Card
      size='lg'
      variant='soft'
      sx={{
        bgcolor: '#EFEFEF',
        maxWidth: '100%',
        transition: 'background-color 0.3s',
        '&:hover': {
          bgcolor: '#DEDEDE',
          cursor: 'pointer',
        },
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
}
