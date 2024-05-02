import Chip from '@mui/joy/Chip';
import colors from '../../colors';
import { ProjectAreas } from '../../types/project';
import { ProjectStatus } from '../../types/projects';

type CardProjectProps = {
  name: string;
  status: ProjectStatus;
  department: ProjectAreas;
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
 * @param {CardProjectProps} props - Component props
 * @param {string} props.name - The name of the client
 * @param {ProjectStatus} props.status - The status of the project
 * @param {ProjectAreas} props.department - The areas of the organization
 *
 * @returns {JSX.Element} Client Card component
 */

const CardProject = ({ name, status, department }: CardProjectProps) => {
  return (
    <main className='bg-[#EFEFEF] rounded-lg p-4'>
      <section className='flex gap-3'>
        <div className='border border-2 h-10 border-[#9C844C]' />
        <h5 className='text-[#424242] font-montserrat'>{name}</h5>
      </section>
      <section className='mt-3 flex gap-3'>
        <Chip variant='solid' sx={{ 'background-color': getStatusColor(status) }}>
          {status}
        </Chip>
        <Chip
          variant='solid'
          sx={{
            'background-color': colors.lightGold,
            textTransform: 'lowercase',
            color: colors.darkerGold,
          }}
        >
          {department}
        </Chip>
      </section>
    </main>
  );
};

export default CardProject;
