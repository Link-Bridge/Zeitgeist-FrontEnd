import Card from '@mui/joy/Card';

export default function CardContainer({children}) {
    return (
        <Card
            size="lg"
            variant="soft"
            sx={{ bgcolor: '#EFEFEF', maxWidth: "420px "}}
        >
            {children}
        </Card>
    );
}