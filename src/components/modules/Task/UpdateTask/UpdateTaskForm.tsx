import { Grid, Input, Snackbar, Textarea } from '@mui/joy';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarContext, SnackbarState } from '../../../../hooks/snackbarContext';
import { EmployeeEntity } from '../../../../types/employee';
import { TaskDetail, UpdatedTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import { RoutesPath } from '../../../../utils/constants';
import CancelButton from '../../../common/CancelButton';
import CustomDatePicker from '../../../common/DatePicker';
import GenericDropdown from '../../../common/GenericDropdown';
import ModifyButton from '../../../common/ModifyButton';
import { Header, Item, StyledSheet } from '../styled';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
  [TaskStatus.SELECT_OPTION]: '',
};

interface UpdateTaskFormProps {
  onSubmit: (payload: UpdatedTask) => Promise<void>;
  employees: EmployeeEntity[];
  data: TaskDetail;
}

/**
 * New Task form component
 *
 * @component
 * @param {UpdateTaskFormProps} props - Component props
 *
 * @returns {JSX.Element} New Task form component
 */
const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  onSubmit,
  employees,
  data,
}: UpdateTaskFormProps): JSX.Element => {
  const { idTask } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [assignedEmployee, setAssignedEmployee] = useState<string | ''>('');
  const [workedHours, setWorkedHours] = useState<string | null>(null);
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

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

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setStartDate(dayjs(data.startDate));
      setDueDate(dayjs(data.endDate));
      setStatus(data.status);
      setAssignedEmployee(data.employeeFirstName + ' ' + data.employeeLastName);
      setWorkedHours(data.workedHours?.toString() ?? '');
    }
  }, [data]);

  const getSelectedEmployee = (
    firstName: string | undefined,
    lastName: string | undefined
  ): string => {
    const fullName = firstName && lastName ? `${firstName} ${lastName}` : '';
    return fullName.toString();
  };

  const handleSubmit = async () => {
    const requiredFields = [
      'title',
      'description',
      'startDate',
      'dueDate',
      'status',
      'projectName',
    ];

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

    const payload: UpdatedTask = {
      id: idTask as string,
      title: title,
      description: description,
      status: status.toUpperCase() as TaskStatus,
      startDate: startDate?.toISOString() ?? '',
      endDate: dueDate?.toISOString() ?? '',
      workedHours: workedHours ?? '0.0',
      idEmployee: employees.find(employee => {
        const fullName = employee.firstName + ' ' + employee.lastName;
        return fullName === assignedEmployee;
      })?.id as string,
    };

    try {
      console.log('good payload', payload);
      await onSubmit(payload);
      setState({ open: true, message: 'Task updated successfully.', type: 'success' });
      setTimeout(() => {
        navigate(RoutesPath.TASKS);
      }, 2000);
    } catch (error) {
      console.log('bad payload', payload);
      setState({ open: true, message: 'Failed to update task.', type: 'danger' });
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

  return (
    <StyledSheet>
      <Header>Title *</Header>
      <Input
        type='text'
        placeholder='Write your text here... '
        value={title}
        onChange={handleTitleChange}
        sx={{
          color: '#BDBDBD',
          borderColor: errors['title'] ? '#FF7A7A' : undefined,
        }}
      />

      <Header>Description *</Header>
      <Textarea
        placeholder='Write your text here... '
        value={description}
        onChange={handleDescriptionChange}
        sx={{
          color: '#BDBDBD',
          width: '100%',
          height: '200px',
          padding: '10px',
          borderRadius: '4px',
          border: `1px solid ${errors['description'] ? '#FF7A7A' : '#E0E0E0'}`,
          '&:focus': {
            border: '1px solid #9C844C',
          },
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
                borderColor: errors['startDate'] ? '#FF7A7A' : undefined,
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
                borderColor: errors['dueDate'] ? '#FF7A7A' : undefined,
              }}
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Status *</Header>
            <GenericDropdown
              defaultValue={data.status as TaskStatus}
              options={Object.values(TaskStatus)}
              onValueChange={handleStatusSelect}
              placeholder='Select status'
              colorMap={statusColorMap}
              sx={{
                color: '#BDBDBD',
                borderColor: errors['status'] ? '#FF7A7A' : undefined,
              }}
            />
          </Item>
        </Grid>
      </Grid>

      {/* Waiting For, Worked Hours, Project Name */}
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Item>
            <Header>Assigned Employee</Header>
            <GenericDropdown
              defaultValue={getSelectedEmployee(data.employeeFirstName, data.employeeLastName)}
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
                color: '#BDBDBD',
              }}
            />
          </Item>
        </Grid>
      </Grid>

      {/* Cancel & send button */}
      <Grid container justifyContent='flex-end'>
        <Grid>
          <Item>
            <CancelButton onClick={handleCancel} />
          </Item>
        </Grid>
        <Grid>
          <Item>
            <ModifyButton onClick={handleSubmit} />
          </Item>
        </Grid>
      </Grid>
      <SnackbarContext.Provider value={{ state, setState }}>
        <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
          {state.message}
        </Snackbar>
      </SnackbarContext.Provider>
    </StyledSheet>
  );
};

export default UpdateTaskForm;
