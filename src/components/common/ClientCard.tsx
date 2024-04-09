import { Chip } from "@mui/joy";
import CardContainer from "./CardContainer";

interface ClientCardProps {
  name: string;
  accountingHours: number;
  legalHours: number;
  chargeableHours: number;
  totalProjects: number;
}

const ClientCard = ({name, accountingHours, legalHours, chargeableHours, totalProjects} : ClientCardProps) => {
  return (
    <CardContainer>
        <header className='mb-3 text-xl'>
            {name}
        </header>
        <div className='grid grid-cols-2 gap-2'>
            <Chip sx={{
                bgcolor:'#EAD3AA'
            }}>Accounting Hours: {accountingHours}</Chip>
            <Chip sx={{
                bgcolor: '#EAD3AA'
            }}>Legal Hours: {legalHours}</Chip>
            <Chip sx={{
                bgcolor:'#B39C844C'
            }}>Chargeable Hours: {chargeableHours}</Chip>
            <Chip sx={{
                bgcolor:'#E3EFFB',
                color:'#0B6BCB',
                border: '1px solid #97C3F0'
            }}>Total Projects: {totalProjects}</Chip>
        </div>
    </CardContainer>
    
  )
}

export default ClientCard