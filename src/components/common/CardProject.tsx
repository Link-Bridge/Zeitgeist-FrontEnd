import Chip from '@mui/joy/Chip';
import { DepartmentAreas, ProjectStatus } from '../../types/projects';

type CardProjectInterface = {
  name: string;
  status: ProjectStatus;
  department: DepartmentAreas;
};

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.DONE:
      return 'success';
    case ProjectStatus.IN_QUOTATION:
      return 'warning';
    case ProjectStatus.ACCEPTED:
      return 'blue';
    case ProjectStatus.NOT_STARTED:
      return 'lightGray';
    case ProjectStatus.IN_PROCESS:
      return 'darkBlue';
    case ProjectStatus.UNDER_REVISION:
      return 'darkPurple';
    case ProjectStatus.DELAYED:
      return 'danger';
    case ProjectStatus.POSTPONED:
      return 'darkGray';
    case ProjectStatus.CANCELLED:
      return 'darkGold';
    default:
      return 'lightGray';
  }
};

const CardProject = ({ name, status, category }: CardProjectInterface) => {
  return (
    <main className='bg-[#EFEFEF] rounded-lg p-4'>
      <section className='flex gap-3'>
        <div className='border border-2 h-10 border-[#9C844C]' />
        <h5 className='text-[#424242] font-montserrat'>{name}</h5>
      </section>
      <section className='mt-3 flex gap-3'>
        <Chip variant='solid' color={getStatusColor(status)}>
          {status}
        </Chip>
        <Chip variant='solid' color='primary'>
          {category}
        </Chip>
      </section>
    </main>
  );
};

export default CardProject;
