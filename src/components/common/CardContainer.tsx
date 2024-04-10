import { ReactNode } from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';

interface CardContainerProps {
    children: ReactNode;
}

export default function CardContainer({ children }: CardContainerProps) {
    return (
        <Card
            size="lg"
            variant="soft"
            sx={
                { 
                    bgcolor: '#e1e1e1', 
                    maxWidth: "100%", 
                }}
        >
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
