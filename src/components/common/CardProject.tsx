import Chip from '@mui/joy/Chip';

type CardProjectInterface = {
  projectTitle: string;
  status:
    | 'Done'
    | 'In quotation'
    | 'Accepted'
    | 'Not started'
    | 'In progress'
    | 'Under revision'
    | 'Delayed'
    | 'Postponed'
    | 'Cancelled';
  department: 'Legal' | 'Accounting' | 'Directives';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Done':
      return 'success';
    case 'In quotation':
      return 'warning';
    case 'Accepted':
      return 'blue';
    case 'Not started':
      return 'lightGray';
    case 'In progress':
      return 'darkBlue';
    case 'Under revision':
      return 'darkPurple';
    case 'Delayed':
      return 'danger';
    case 'Postponed':
      return 'darkGray';
    case 'Cancelled':
      return 'darkGold';
    default:
      return 'lightGray';
  }
};

const getDepartmentColor = (department: string) => {
  switch (department) {
    case 'Legal':
      return 'lightGold';
    case 'Accounting':
      return 'success';
    case 'Directives':
      return 'darkPurple';
    default:
      return 'lightGray';
  }
};

const CardProject = ({ projectTitle, status, department }: CardProjectInterface) => {
  return (
    <main className='bg-[#EFEFEF] rounded-lg p-4'>
      <section className='flex gap-3'>
        <div className='border border-2 h-10 border-[#9C844C]' />
        <h5 className='text-[#424242] font-montserrat'>{projectTitle}</h5>
      </section>
      <section className='mt-3 flex gap-3'>
        <Chip variant='solid' color={getStatusColor(status)}>
          {status}
        </Chip>
        <Chip variant='solid' color={getDepartmentColor(department)}>
          {department}
        </Chip>
      </section>
    </main>
  );
};

export default CardProject;
