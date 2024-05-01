import Chip from '@mui/joy/Chip';
import colors from '../../../colors';
import { ProjectAreas, ProjectStatus } from '../../../types/project';

type CardProjectProps = {
  id: string;
  name: string;
  status: ProjectStatus;
  department: ProjectAreas;
  company: string;
};

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.DONE:
      return colors.success;
    case ProjectStatus.IN_QUOTATION:
      return colors.darkerBlue;
    case ProjectStatus.ACCEPTED:
      return colors.gold;
    case ProjectStatus.NOT_STARTED:
      return colors.notStarted;
    case ProjectStatus.IN_PROCESS:
      return colors.darkBlue;
    case ProjectStatus.UNDER_REVISION:
      return colors.darkPurple;
    case ProjectStatus.DELAYED:
      return colors.delayed;
    case ProjectStatus.POSTPONED:
      return colors.lightRed;
    case ProjectStatus.CANCELLED:
      return colors.danger;
    default:
      return colors.gray;
  }
};

const getColorArea = (department: ProjectAreas) => {
  switch (department) {
    case ProjectAreas.ACCOUNTING:
      return colors.darkGold;
    case ProjectAreas.CLIENT:
      return colors.darkPurple;
    case ProjectAreas.LEGAL:
      return colors.darkerGold;
    default:
      return colors.darkestGray;
  }
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
      <span className='text-sm text-gold'>{company}</span>
      <section className='mt-3 flex gap-3'>
        <Chip variant='solid' sx={{ 'background-color': getStatusColor(status) }}>
          {status}
        </Chip>
        <Chip variant='solid' sx={{ 'background-color': getColorArea(department) }}>
          {department}
        </Chip>
      </section>
    </section>
  );
};

export default ProjectCard;
