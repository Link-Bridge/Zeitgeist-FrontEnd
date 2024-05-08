import { Box, Chip, Grid, Input, Textarea } from '@mui/joy';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { default as colors, statusChipColorCombination } from '../../../../colors';
import { EmployeeEntity } from '../../../../types/employee';
import { BareboneTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import CancelButton from '../../../common/CancelButton';
import CustomDatePicker from '../../../common/DatePicker';
import ErrorView from '../../../common/Error';
import GenericDropdown from '../../../common/GenericDropdown';
import SendButton from '../../../common/SendButton';
import { Header, Item, StyledSheet } from '../styled';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted.bg,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss.bg,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision.bg,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed.bg,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postpone.bg,
  [TaskStatus.DONE]: statusChipColorCombination.done.bg,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled.bg,
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
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [assignedEmployee, setAssignedEmployee] = useState<string | ''>('');
  const [workedHours, setWorkedHours] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setStartDate(date);
  };

  const handleDueDateChange = (date: dayjs.Dayjs | null) => {
    setDueDate(date);
  };

  const handleStatusSelect = (value: TaskStatus) => {
    setStatus(value);
  };

  const handleAssignedEmployee = (value: string) => {
    setAssignedEmployee(value);
  };

  const handleWorkedHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkedHours(event.target.value);
  };

  const getEmployeeNames = () => {
    return employees.map(employee => employee.firstName + ' ' + employee.lastName);
  };

  const handleSubmit = async () => {
    const requiredFields = ['title', 'description', 'startDate', 'dueDate', 'status'];

    if (!requiredFields.every(field => !!field && field !== '')) {
      setErrors({
        ...errors,
        ...requiredFields.reduce((acc, field) => ({ ...acc, [field]: `${field} is required` }), {}),
      });
      return;
    }

    if (dueDate && startDate && dueDate.isBefore(startDate)) {
      setErrors({
        ...errors,
        dueDate: 'Due date cannot be before start date',
      });
      return;
    }

    setErrors({});

    const payload: BareboneTask = {
      title,
      description,
      status: status as TaskStatus,
      startDate: startDate?.toISOString() ?? '',
      dueDate: dueDate?.toISOString() ?? '',
      workedHours: workedHours ?? '0.0',
      idProject: projectId,
      idEmployee: employees.find(employee => {
        const fullName = employee.firstName + ' ' + employee.lastName;
        return fullName === assignedEmployee;
      })?.id as string,
    };

    try {
      await onSubmit(payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setStartDate(null);
    setDueDate(null);
    setStatus('');
    setAssignedEmployee('');
    setWorkedHours(null);
  };

  if (projectId === '') {
    return <ErrorView error={'Project ID is required'} />;
  }

  return (
    <StyledSheet>
      <Header>Title *</Header>
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

      <Header>Description *</Header>
      <Textarea
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
            <Header>Start Date *</Header>
            <CustomDatePicker
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
            <Header>Due Date *</Header>
            <CustomDatePicker
              value={dueDate}
              onChange={handleDueDateChange}
              sx={{
                borderColor: errors['dueDate'] ? colors.danger : undefined,
              }}
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Status *</Header>
            <GenericDropdown
              options={Object.values(TaskStatus)}
              onValueChange={handleStatusSelect}
              placeholder='Select status'
              colorMap={statusColorMap}
              sx={{
                color: colors.gray,
                borderColor: errors['status'] ? colors.danger : undefined,
              }}
            />
          </Item>
        </Grid>
      </Grid>

      {/* Waiting For, Worked Hours, Project Name */}
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Item>
            <Header>Assign Employee</Header>
            <GenericDropdown
              options={getEmployeeNames()}
              onValueChange={handleAssignedEmployee}
              placeholder='Select employee ...'
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Worked Hours</Header>
            <Input
              placeholder='0'
              type='text'
              value={workedHours ?? ''}
              onChange={handleWorkedHoursChange}
              sx={{
                color: colors.gray,
              }}
            />
          </Item>
        </Grid>
        <Grid>
          <Item>
            <Header>Project Name</Header>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
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
            <Link to={`/projects/details/${projectId.replace(/['"]+/g, '')}`}>
              <SendButton onClick={handleSubmit} />
            </Link>
          </Item>
        </Grid>
      </Grid>
    </StyledSheet>
  );
};

export default NewTaskForm;
