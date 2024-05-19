import { Box, Card, Chip, FormControl, FormLabel, Input, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import { Link } from 'react-router-dom';
import { default as colors, statusChipColorCombination } from '../../../../colors';
import useTaskForm from '../../../../hooks/useTaskForm';
import { EmployeeEntity } from '../../../../types/employee';
import { TaskStatus } from '../../../../types/task-status';
import CancelButton from '../../../common/CancelButton';
import ErrorView from '../../../common/Error';
import GenericDropdown from '../../../common/GenericDropdown';
import SendButton from '../../../common/SendButton';

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgress,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

interface NewTaskFormProps {
  employees: EmployeeEntity[];
  projectId: string;
  projectName: string;
}

/**
 * New Task form component
 *
 * @component
 * @param {NewTaskFormProps} props - Component props
 *
 * @returns {JSX.Element} New Task form component
 */
const NewTaskForm: React.FC<NewTaskFormProps> = ({
  employees,
  projectId,
  projectName,
}: NewTaskFormProps): JSX.Element => {
  const form = useTaskForm();

  if (projectId === '') {
    return <ErrorView error={'Project ID is required'} />;
  }

  return (
    <Card className='overflow-y-scroll'>
      <form className='flex flex-col gap-4'>
        <FormControl>
          <FormLabel>
            Title <span className='text-red-600'>*</span>
          </FormLabel>
          <Input
            type='text'
            placeholder='Write your text here... '
            value={form.formState.title}
            onChange={e => form.changeField('title', e.target.value)}
            sx={{
              color: colors.gray,
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Description <span className='text-red-600'>*</span>
          </FormLabel>
          <Textarea
            minRows={5}
            maxRows={5}
            placeholder='Write your text here... '
            value={form.formState.description}
            onChange={e => form.changeField('description', e.target.value)}
            sx={{
              color: colors.gray,
              width: '100%',
              height: '200px',
              padding: '10px',
              borderRadius: '4px',
            }}
          />
        </FormControl>
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <FormControl>
            <FormLabel>
              Start Date <span className='text-red-600'>*</span>
            </FormLabel>
            <DatePicker
              value={form.formState.startDate.utc()}
              onChange={newDate =>
                form.changeField('startDate', newDate ?? form.formState.startDate)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <DatePicker
              value={form.formState.endDate?.utc()}
              onChange={newDate => form.changeField('endDate', newDate)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Status <span className='text-red-600'>*</span>
            </FormLabel>
            <GenericDropdown
              value={form.formState.status}
              options={Object.values(TaskStatus)}
              onChange={status => form.changeField('status', status)}
              placeholder='Select status'
              colorMap={statusColorMap}
            />
          </FormControl>
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <FormControl>
            <FormLabel>Assign Employee</FormLabel>
            <GenericDropdown
              value={form.formState.assignedEmployee}
              onChange={newVal => form.changeField('assignedEmployee', newVal)}
              options={employees.map(employee => `${employee.firstName} ${employee.lastName}`)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Worked Hours</FormLabel>
            <Input
              type='number'
              value={form.formState.workedHours}
              onChange={e => form.changeField('workedHours', Number(e.target.value))}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Project Name</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                className='min-w-[150px] pr-6'
                variant='soft'
                sx={{
                  bgcolor: colors.lighterGray,
                  color: colors.gray,
                  fontSize: '1rem',
                  flexGrow: 1,
                  padding: '0.3rem 1rem',
                }}
              >
                {projectName}
              </Chip>
            </Box>
          </FormControl>
        </section>
        <section className='flex lg:mt-10 gap-4 justify-end'>
          <Link to={`/projects/details/${projectId.replace(/['"]+/g, '')}`}>
            <CancelButton onClick={() => {}} />
          </Link>
          <SendButton />
        </section>
      </form>
    </Card>
  );
};

export default NewTaskForm;
