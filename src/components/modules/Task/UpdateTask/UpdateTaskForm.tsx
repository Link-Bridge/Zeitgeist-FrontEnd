import { Button, Card, FormControl, FormLabel, Input, Snackbar, Textarea } from '@mui/joy';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { default as colors, statusChipColorCombination } from '../../../../colors';
import { SnackbarContext, SnackbarState } from '../../../../hooks/snackbarContext';
import { EmployeeEntity } from '../../../../types/employee';
import { TaskDetail, UpdatedTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import { RoutesPath } from '../../../../utils/constants';
import CustomDatePicker from '../../../common/DatePicker';
import GenericDropdown from '../../../common/GenericDropdown';

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

interface UpdateTaskFormProps {
  onSubmit: (payload: UpdatedTask) => Promise<void>;
  employees: EmployeeEntity[];
  data: TaskDetail;
}

/**
 * Update Task form component
 *
 * @component
 * @param {UpdateTaskFormProps} props - Component props
 *
 * @returns {JSX.Element} Update Task form component
 */
const UpdateTaskForm: React.FC<UpdateTaskFormProps> = ({
  onSubmit,
  employees,
  data,
}: UpdateTaskFormProps): JSX.Element => {
  const idTask = data.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [assignedEmployee, setAssignedEmployee] = useState<string | ''>('');
  const [workedHours, setWorkedHours] = useState<string | ''>('');
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
      setState({ open: true, message: 'Please fill all fields.', type: 'danger' });
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
        message: 'Description cannot be longer than 256 characters',
        type: 'danger',
      });
      return;
    }
    setDescription(event.target.value);

    if (!event.target.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, description: 'Description is required' }));
      setState({ open: true, message: 'Please fill all fields.', type: 'danger' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, description: '' }));
      setState({ open: false, message: '' });
    }
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    if (date && dueDate && date.isAfter(dueDate)) {
      setState({
        open: true,
        message: 'Start date cannot be after due date.',
        type: 'danger',
      });
    } else {
      setState({ open: false, message: '' });
    }
    setStartDate(date);
  };

  const handleDueDateChange = (date: dayjs.Dayjs | null) => {
    const datesValid = !date || !startDate || date.isAfter(startDate);

    if (!datesValid) {
      setState({
        open: true,
        message: 'Due date cannot be before start date.',
        type: 'danger',
      });
    } else {
      setState({ open: false, message: '' });
    }

    setDueDate(date);
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

    if (!event.target.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: 'Worked hours are required' }));
      setState({ open: true, message: 'Please fill all fields.', type: 'danger' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: '' }));
      setState({ open: false, message: '' });
    }
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
      status: status as TaskStatus,
      startDate: startDate?.toISOString() ?? '',
      endDate: dueDate?.toISOString() ?? '',
      workedHours: workedHours ?? '0.0',
      idEmployee: employees.find(employee => {
        const fullName = employee.firstName + ' ' + employee.lastName;
        return fullName === assignedEmployee;
      })?.id as string,
    };

    try {
      await onSubmit(payload);
      setState({ open: true, message: 'Task updated successfully.', type: 'success' });
      setTimeout(() => {
        navigate(RoutesPath.TASKS + '/' + idTask);
      }, 2000);
    } catch (error) {
      setState({ open: true, message: 'Failed to update task.', type: 'danger' });
    }
  };

  const handleCancel = () => {
    navigate(RoutesPath.TASKS + '/' + idTask);
  };

  const hasErrors = () => {
    return Object.values(errors).some(error => !!error);
  };

  const hasEmptyFields = () => {
    return (
      !title ||
      !description ||
      !startDate ||
      !dueDate ||
      !status ||
      !assignedEmployee ||
      !workedHours
    );
  };

  const hasWrongLength = () => {
    if (title.length > 70 || description.length > 256 || workedHours.toString().length > 8) {
      console.log('wrong length');
      return true;
    }
  };

  const datesAreNotValid = () => {
    if (
      (dueDate && startDate && dueDate.isBefore(startDate)) ||
      (dueDate && startDate && startDate.isAfter(dueDate))
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Card
        className='bg-white flex-1 min-h-0 lg:overflow-y-hidden overflow-y-scroll'
        sx={{ padding: '30px' }}
      >
        <form className='flex flex-col gap-4'>
          <FormControl className='pb-3 pt-3'>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
              Title <span className='text-red-600'>*</span>
            </FormLabel>
            <Input
              type='text'
              placeholder='Write your text here...'
              value={title}
              onChange={handleTitleChange}
              sx={{
                borderColor: errors['title'] ? colors.danger : undefined,
              }}
            />
          </FormControl>
          <FormControl className='pb-3 pt-3'>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
              Description <span className='text-red-600'>*</span>
            </FormLabel>
            <Textarea
              placeholder='Write your text here...'
              value={description}
              onChange={handleDescriptionChange}
              sx={{
                width: '100%',
                height: '200px',
                padding: '10px',
                borderRadius: '4px',
                borderColor: errors['description'] ? colors.danger : colors.lighterGray,
                '&:focus': {
                  border: `1px solid ${colors.darkGold}`,
                },
              }}
            />
          </FormControl>
          <section className='lg:flex flex-wrap gap-4'>
            <div className='flex-none pr-8'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Start Date <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomDatePicker
                  value={startDate}
                  onChange={handleStartDateChange}
                  sx={{
                    borderColor: errors['startDate'] ? colors.danger : undefined,
                  }}
                />
              </FormControl>
            </div>
            <div className='flex-none pr-8'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Due Date <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomDatePicker
                  value={dueDate}
                  onChange={handleDueDateChange}
                  sx={{
                    borderColor: errors['dueDate'] ? colors.danger : undefined,
                  }}
                />
              </FormControl>
            </div>
            <div className='flex-none pr-8'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Status <span className='text-red-600'>*</span>
                </FormLabel>
                <GenericDropdown
                  defaultValue={data.status as TaskStatus}
                  options={Object.values(TaskStatus)}
                  onValueChange={handleStatusSelect}
                  placeholder='Select status'
                  colorMap={statusColorMap}
                  sx={{
                    color: colors.gray,
                    borderColor: errors['status'] ? colors.danger : undefined,
                  }}
                />
              </FormControl>
            </div>
          </section>
          <section className='lg:flex flex-wrap gap-4'>
            <div className='flex-none pr-8'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Assigned Employee
                </FormLabel>
                <GenericDropdown
                  defaultValue={getSelectedEmployee(data.employeeFirstName, data.employeeLastName)}
                  options={getEmployeeNames()}
                  onValueChange={handleAssignedEmployee}
                  placeholder='Select employee'
                />
              </FormControl>
            </div>
            <div className='flex-none pr-8'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Worked Hours</FormLabel>
                <Input
                  placeholder='0'
                  type='text'
                  value={workedHours ?? ''}
                  onChange={handleWorkedHoursChange}
                  sx={{
                    color: colors.gray,
                  }}
                />
              </FormControl>
            </div>
          </section>
          <section className='flex gap-4 justify-end'>
            <Button
              variant='outlined'
              sx={{
                borderColor: colors.darkerGold,
                color: colors.darkGold,
                '&:hover': {
                  borderColor: colors.darkerGold,
                  background: colors.darkGold,
                  color: 'white',
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={hasErrors() || hasEmptyFields() || datesAreNotValid() || hasWrongLength()}
              sx={{
                background: colors.darkGold,
                '&:hover': {
                  backgroundColor: colors.darkerGold,
                },
              }}
            >
              Submit
            </Button>
          </section>
        </form>
      </Card>

      {/* Snackbar */}
      <SnackbarContext.Provider value={{ state, setState }}>
        <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
          {state.message}
        </Snackbar>
      </SnackbarContext.Provider>
    </>
  );
};

export default UpdateTaskForm;
