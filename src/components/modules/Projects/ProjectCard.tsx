import Chip from '@mui/joy/Chip';
import colors from '../../../colors';
import { ProjectAreas, ProjectStatus } from '../../../types/project';
import { truncateText } from '../../../utils/methods';
import StatusChip from '../../common/StatusChip';

type CardProjectProps = {
  name: string;
  status: ProjectStatus;
  department: ProjectAreas;
  company?: string;
};

/**
 * Client Card component
 *
 * @component
 * @param props - Component props
 * @param props.name - The name of the client
 * @param props.status - The status of the project
 * @param props.department - The areas of the organization
 *
 * @returns Client Card component
 */
const ProjectCard = ({ name, status, department, company }: CardProjectProps): JSX.Element => {
  return (
    <section className='bg-[#EFEFEF] hover:bg-[#DEDEDE] rounded-lg p-4'>
      <section className='flex gap-3'>
        <div className='border-2 h-8 border-[#9C844C]' />
        <h5 className='text-[#424242] font-montserrat'>{name}</h5>
      </section>
      {company && <span className='text-sm text-gold break-all'>{truncateText(company)}</span>}
      {''}
      <section className='mt-3 flex gap-3'>
        <StatusChip status={status} />
        <Chip
          variant='solid'
          sx={{
            backgroundColor: colors.lightGold,
            color: colors.darkerGold,
          }}
        >
          {department}
        </Chip>
      </section>
    </section>
  );
};

export default ProjectCard;
