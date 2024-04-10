import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
                    transition: 'background-color 0.3s',
                    "&:hover": {
                        bgcolor: '#c1c1c1', 
                        cursor: "pointer",
                    }, 
                }}
        >
            <Link to={"#"}>
                <CardContent>
                    {children}
                </CardContent>
            </Link>
        </Card>
    );
}
