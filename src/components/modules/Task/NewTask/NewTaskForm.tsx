import { Box, Chip, FormLabel, Grid, Input, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default as colors, statusChipColorCombination } from '../../../../colors';
import { SnackbarContext } from '../../../../hooks/snackbarContext';
import { EmployeeEntity } from '../../../../types/employee';
import { BareboneTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import CancelButton from '../../../common/CancelButton';
import ErrorView from '../../../common/Error';
import GenericDropdown from '../../../common/GenericDropdown';
import SendButton from '../../../common/SendButton';
import { Item, StyledSheet } from '../styled';

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
  onSubmit: (payload: BareboneTask) => Promise<void>;
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
  onSubmit,
  employees,
  projectId,
  projectName,
}: NewTaskFormProps): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [assignedEmployee, setAssignedEmployee] = useState<string | ''>('');
  const [workedHours, setWorkedHours] = useState<string | ''>('');
  const { setState } = useContext(SnackbarContext);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    if (newTitle.length > 70) {
      setErrors(prevErrors => ({ ...prevErrors, title: '' }));
      return setState({
        open: true,
        message: 'Title cannot be longer than 70 characters',
        type: 'danger',
      });
    }
    setTitle(event.target.value);

    if (!event.target.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, title: 'Title is required' }));
      setState({ open: true, message: 'Title is required.', type: 'danger' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, title: '' }));
      setState({ open: false, message: '' });
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = event.target.value;

    if (newDescription.length > 256) {
      setErrors(prevErrors => ({ ...prevErrors, description: '' }));
      setState({
        open: true,
        message: 'Description cannot be longer than 256 characters.',
        type: 'danger',
      });
      return;
    }
    setDescription(event.target.value);

    if (!event.target.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, description: 'Description is required' }));
      setState({ open: true, message: 'Description is required.', type: 'danger' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, description: '' }));
      setState({ open: false, message: '' });
    }
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    const startDateJS = date?.toDate();
    if (date && endDate && date.isAfter(endDate)) {
      setState({
        open: true,
        message: 'Start date cannot be after end date.',
        type: 'danger',
      });
    } else if (startDate && (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear())) {
      setState({ open: true, message: 'Please enter a valid date.', type: 'danger' });
    } else {
      setState({ open: false, message: '' });
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    const endDateJS = date?.toDate();
    const datesAreNotValid = date && dayjs(date).isBefore(dayjs(startDate));

    if (datesAreNotValid) {
      setState({
        open: true,
        message: 'End date cannot be before start date.',
        type: 'danger',
      });
    } else if (endDate && (!endDateJS?.getDate() || !endDateJS?.getMonth() || !endDateJS?.getFullYear())) {
      setState({ open: true, message: 'Please enter a valid date.', type: 'danger' });
    } else if (dayjs(date).isSame(dayjs(startDate))) {
      setState({ open: false, message: '' });
    } else {
      setState({ open: false, message: '' });
    }

    setEndDate(date);
  };

  const handleStatusSelect = (value: TaskStatus) => {
    setStatus(value);
  };

  const handleAssignedEmployee = (value: string) => {
    setAssignedEmployee(value);
  };

  const handleWorkedHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!/^\d*\.?\d*$/.test(newValue)) {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: 'Only numbers are allowed' }));
      setState({ open: true, message: 'Worked hours can only be numbers.', type: 'danger' });
      return;
    }

    if (newValue.length > 8) {
      setErrors(prevErrors => ({
        ...prevErrors,
        workedHours: 'Worked hours cannot be longer than 8 characters',
      }));
      setState({
        open: true,
        message: 'Worked hours cannot be longer than 8 characters.',
        type: 'danger',
      });
      return;
    }

    setWorkedHours(event.target.value);
  };

  const getEmployeeNames = () => {
    return employees.map(employee => employee.firstName + ' ' + employee.lastName);
  };

  const handleSubmit = async () => {
    const payload: BareboneTask = {
      title,
      description,
      status: status as TaskStatus,
      startDate: startDate?.toISOString() ?? '',
      endDate: endDate?.toISOString() ?? null,
      workedHours: workedHours !== '' ? workedHours : '0',
      idProject: projectId,
      idEmployee: employees.find(employee => {
        const fullName = employee.firstName + ' ' + employee.lastName;
        return fullName === assignedEmployee;
      })?.id as string,
    };

    try {
      await onSubmit(payload);
      setState({ open: true, message: 'Task created successfully.', type: 'success' });
      setTimeout(() => {
        navigate(`/projects/details/${projectId}`);
      }, 2000);
    } catch (error) {
      setState({ open: true, message: 'Failed to create task.', type: 'danger' });
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setStartDate(null);
    setEndDate(null);
    setStatus('');
    setAssignedEmployee('');
    setWorkedHours('');
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => !!error);
  };

  const hasEmptyFields = () => {
    return !title || !description || !startDate || !status;
  };

  const hasWrongLength = () => {
    if (title.length > 70 || description.length > 256 || workedHours.toString().length > 8) {
      return true;
    }
  };

  const isEndDateBeforeStartDate = () => {
    return endDate && startDate && endDate.isBefore(startDate);
  };

  const isStartDateAfterEndDate = () => {
    return endDate && startDate && startDate.isAfter(endDate);
  };

  const isInvalidEndDate = () => {
    const endDateJS = endDate?.toDate();
    if (endDate && (!endDateJS?.getDate() || !endDateJS?.getMonth() || !endDateJS?.getFullYear())) {
      return true;
    } else {
      return false;
    }
  };

  const isInvalidStartDate = () => {
    const startDateJS = startDate?.toDate();
    if (
      startDate &&
      (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const datesAreNotValid = () => {
    return (
      isEndDateBeforeStartDate() ||
      isStartDateAfterEndDate() ||
      isInvalidEndDate() ||
      isInvalidStartDate()
    );
  };

  if (projectId === '') {
    return <ErrorView error={'Project ID is required'} />;
  }

  return (
    <StyledSheet className='p-10 py-4 h-[calc(100vh-190px)] overflow-scroll overflow-x-hidden'>
      <main className='flex flex-col gap-4'>
        <FormLabel>
          Title <span className='text-red-600'>*</span>
        </FormLabel>
        <Input
          type='text'
          placeholder='Write your text here... '
          value={title}
          onChange={handleTitleChange}
          sx={{
            color: colors.gray,
            borderColor: errors['title'] ? colors.danger : undefined,
          }}
        />

        <FormLabel>
          Description <span className='text-red-600'>*</span>
        </FormLabel>
        <Textarea
          minRows={5}
          maxRows={5}
          placeholder='Write your text here... '
          value={description}
          onChange={handleDescriptionChange}
          sx={{
            color: colors.gray,
            width: '100%',
            height: '200px',
            padding: '10px',
            borderRadius: '4px',
            border: `1px solid ${errors['description'] ? colors.danger : '#E0E0E0'}`,
          }}
        />

        {/* Date and status columns */}
        <Grid container spacing={2}>
          <Grid xs={2}>
            <Item>
              <FormLabel>
                Start Date <span className='text-red-600'>*</span>
              </FormLabel>
              <DatePicker
                value={startDate}
                onChange={handleStartDateChange}
                sx={{
                  borderColor: errors['startDate'] ? colors.danger : undefined,
                }}
              />
            </Item>
          </Grid>
          <Grid xs={2}>
            <Item>
              <FormLabel>End Date</FormLabel>
              <DatePicker
                value={endDate}
                onChange={handleEndDateChange}
                sx={{
                  borderColor: errors['endDate'] ? colors.danger : undefined,
                }}
              />
            </Item>
          </Grid>
          <Grid xs={2}>
            <Item>
              <FormLabel>
                Status <span className='text-red-600'>*</span>
              </FormLabel>
              <GenericDropdown
                options={Object.values(TaskStatus)}
                onChange={newVal => handleStatusSelect(newVal as TaskStatus)}
                placeholder='Select status'
                colorMap={statusColorMap}
              />
            </Item>
          </Grid>
        </Grid>

        {/* Assign Employee, Worked Hours, Project Name */}
        <Grid container spacing={2}>
          <Grid container xs={2} className='md mr-20'>
            <Item>
              <FormLabel>Assign Employee</FormLabel>
              <GenericDropdown
                options={getEmployeeNames()}
                onChange={handleAssignedEmployee}
                placeholder='Select employee ...'
              />
            </Item>
          </Grid>
          <Grid container xs={2} className='md'>
            <Item className='ml-8'>
              <FormLabel>Worked Hours</FormLabel>
              <Input
                placeholder='0'
                type='text'
                value={workedHours ?? ''}
                onChange={handleWorkedHoursChange}
                sx={{
                  color: colors.gray,
                  borderColor: errors['workedHours'] ? colors.danger : undefined,
                }}
              />
            </Item>
          </Grid>
          <Grid>
            <Item className='ml-20'>
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
            </Item>
          </Grid>
        </Grid>

        {/* Cancel & send button */}
        <Grid container justifyContent='flex-end'>
          <Grid>
            <Item>
              <Link to={`/projects/details/${projectId.replace(/['"]+/g, '')}`}>
                <CancelButton onClick={handleCancel} />
              </Link>
            </Item>
          </Grid>
          <Grid>
            <Item>
              <SendButton
                onClick={() => {
                  setIsPosting(true);
                  handleSubmit();
                  setTimeout(() => {
                    setIsPosting(false);
                  }, 3000);
                }}
                disabled={
                  hasErrors() ||
                  hasEmptyFields() ||
                  datesAreNotValid() ||
                  hasWrongLength() ||
                  isPosting
                }
              />
            </Item>
          </Grid>
        </Grid>
      </main>
    </StyledSheet>
  );
};

export default NewTaskForm;
