import Chip from '@mui/joy/Chip';
import colors from '../../../colors';
import { ProjectAreas, ProjectStatus } from '../../../types/project';
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
      <section className='flex flex-nowrap gap-3'>
        <div className='border-2 h-8 border-[#9C844C]' />
        <h5 className='text-[#424242] font-montserrat truncate'>{name}</h5>
      </section>
      <h5 className='text-sm text-gold truncate'>{company}</h5>
      <section className='mt-3 flex flex-nowrap gap-3 overflow-hidden'>
        <StatusChip status={status} />
        <Chip
          variant='solid'
          sx={{
            backgroundColor: colors.lightGold,
            color: colors.darkerGold,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
          }}
        >
          {department}
        </Chip>
      </section>
    </section>
  );
};

export default ProjectCard;
