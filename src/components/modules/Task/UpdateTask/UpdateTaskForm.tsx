import { Card, FormControl, FormHelperText, FormLabel, Input, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { default as colors, statusChipColorCombination } from '../../../../colors';
import { SnackbarContext } from '../../../../hooks/snackbarContext';
import useHttp from '../../../../hooks/useHttp';
import { EmployeeEntity } from '../../../../types/employee';
import { TaskDetail, UpdatedTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import { APIPath, RequestMethods, RoutesPath } from '../../../../utils/constants';
import CancelButton from '../../../common/CancelButton';
import GenericDropdown from '../../../common/GenericDropdown';
import ModifyButton from '../../../common/ModifyButton';
dayjs.extend(utc);

const statusColorMap: Record<TaskStatus, { bg: string; font: string }> = {
  [TaskStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [TaskStatus.IN_PROGRESS]: statusChipColorCombination.inProgress,
  [TaskStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [TaskStatus.DELAYED]: statusChipColorCombination.delayed,
  [TaskStatus.POSTPONED]: statusChipColorCombination.postponed,
  [TaskStatus.DONE]: statusChipColorCombination.done,
  [TaskStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

interface UpdateTaskFormProps {
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
  employees,
  data,
}: UpdateTaskFormProps): JSX.Element => {
  const idTask = data.id;
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

  const req = useHttp<UpdatedTask>(`${APIPath.UPDATE_TASK}/${data.id}`, RequestMethods.PUT);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (req.data) {
      setState({ open: true, message: 'Task updated successfully.', type: 'success' });
      setTimeout(() => {
        navigate(RoutesPath.TASKS + '/' + idTask, { state: location.state, replace: true });
      }, 2000);
    }
  }, [req.data]);

  useEffect(() => {
    if (req.error) setState({ open: true, message: 'Failed to update task.', type: 'danger' });
  }, [req.error]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    if (newTitle.length > 70) {
      setErrors(prevErrors => ({ ...prevErrors, title: '' }));
      return setState({
        open: true,
        message: 'Title cannot be longer than 70 characters.',
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
      setErrors(prevErrors => ({ ...prevErrors, description: 'Description is required.' }));
      setState({ open: true, message: 'Description is required.', type: 'danger' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, description: '' }));
      setState({ open: false, message: '' });
    }
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    const startDateJS = date?.toDate();
    if (date && endDate && date.isAfter(endDate)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        startDate: 'Start date cannot be after end date.',
      }));
      setState({
        open: true,
        message: 'Start date cannot be after end date.',
        type: 'danger',
      });
    } else if (
      startDate &&
      (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear())
    ) {
      setErrors(prevErrors => ({ ...prevErrors, startDate: 'Please enter a valid date.' }));
      setState({ open: true, message: 'Please enter a valid date.', type: 'danger' });
    } else {
      setState({ open: false, message: '' });
      setErrors(prevErrors => ({ ...prevErrors, startDate: '' }));
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    const endDateJS = date?.toDate();
    const datesAreNotValid = date && dayjs(date).isBefore(dayjs(startDate));

    if (datesAreNotValid) {
      setErrors(prevErrors => ({
        ...prevErrors,
        endDate: 'End date cannot be before start date.',
      }));
      setState({
        open: true,
        message: 'End date cannot be before start date.',
        type: 'danger',
      });
    } else if (
      endDate &&
      (!endDateJS?.getDate() || !endDateJS?.getMonth() || !endDateJS?.getFullYear())
    ) {
      setErrors(prevErrors => ({ ...prevErrors, endDate: 'Please enter a valid date.' }));
      setState({ open: true, message: 'Please enter a valid date.', type: 'danger' });
    } else if (dayjs(date).isSame(dayjs(startDate))) {
      setState({ open: false, message: '' });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, endDate: '' }));
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
    } else {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: '' }));
      setState({ open: false, message: '' });
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
    } else {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: '' }));
      setState({ open: false, message: '' });
    }

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
      setEndDate(dayjs(data.endDate));
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
    const payload: UpdatedTask = {
      id: idTask as string,
      title: title,
      description: description,
      status: status as TaskStatus,
      startDate: startDate?.toISOString() ?? '',
      endDate: endDate !== null ? endDate?.toISOString() : null,
      workedHours: workedHours ?? '0.0',
      idEmployee: employees.find(employee => {
        const fullName = employee.firstName + ' ' + employee.lastName;
        return fullName === assignedEmployee;
      })?.id as string,
    };

    req.sendRequest({}, { ...payload });
  };

  const handleCancel = () => {
    navigate(RoutesPath.TASKS + '/' + idTask);
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
    if (
      isEndDateBeforeStartDate() ||
      isStartDateAfterEndDate() ||
      isInvalidEndDate() ||
      isInvalidStartDate()
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Card className='overflow-y-scroll'>
      <form className='flex flex-col gap-4'>
        <FormControl>
          <FormLabel>
            Title <span className='text-red-600'>*</span>
          </FormLabel>
          <Input
            error={errors['title'] ? true : false}
            type='text'
            placeholder='Write your text here... '
            value={title}
            onChange={handleTitleChange}
            sx={{
              color: colors.gray,
              borderColor: errors['title'] ? colors.danger : undefined,
            }}
          />
          {errors['title'] !== '' && (
            <FormHelperText sx={{ color: colors.danger }}>{errors['title']}</FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel>
            Description <span className='text-red-600'>*</span>
          </FormLabel>
          <Textarea
            error={errors['description'] ? true : false}
            placeholder='Write your text here... '
            value={description}
            onChange={handleDescriptionChange}
            sx={{
              color: colors.gray,
              width: '100%',
              height: '200px',
              padding: '10px',
              borderRadius: '4px',
              '&:focus': {
                border: '1px solid' + colors.darkGold,
              },
            }}
          />
          {errors['description'] !== '' && (
            <FormHelperText sx={{ color: colors.danger }}>{errors['description']}</FormHelperText>
          )}
        </FormControl>
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <FormControl>
            <FormLabel>
              Start Date <span className='text-red-600'>*</span>
            </FormLabel>
            <DatePicker
              value={startDate?.utc()}
              onChange={handleStartDateChange}
              sx={{
                borderColor: errors['startDate'] ? colors.danger : undefined,
              }}
            />
            {errors['startDate'] !== '' && (
              <FormHelperText sx={{ color: colors.danger }}>{errors['startDate']}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <DatePicker
              value={endDate?.utc()}
              onChange={handleEndDateChange}
              sx={{
                borderColor: errors['endDate'] ? colors.danger : undefined,
              }}
            />
            {errors['endDate'] !== '' && (
              <FormHelperText sx={{ color: colors.danger }}>{errors['endDate']}</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>
              Status <span className='text-red-600'>*</span>
            </FormLabel>
            <GenericDropdown
              defaultValue={data.status as TaskStatus}
              options={Object.values(TaskStatus)}
              onChange={newVal => handleStatusSelect(newVal as TaskStatus)}
              placeholder='Select status'
              colorMap={statusColorMap}
            />
          </FormControl>
        </section>
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <FormControl>
            <FormLabel>Assigned Employee</FormLabel>
            <GenericDropdown
              defaultValue={getSelectedEmployee(data.employeeFirstName, data.employeeLastName)}
              options={getEmployeeNames()}
              onChange={handleAssignedEmployee}
              placeholder='Select employee ...'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Worked Hours</FormLabel>
            <Input
              placeholder='0'
              type='text'
              value={workedHours ?? ''}
              onChange={handleWorkedHoursChange}
              sx={{
                color: colors.gray,
              }}
            />
            {errors['workedHours'] !== '' && (
              <FormHelperText sx={{ color: colors.danger }}>{errors['workedHours']}</FormHelperText>
            )}
          </FormControl>
        </section>
        <section className='flex lg:mt-10 gap-4 justify-end'>
          <CancelButton onClick={handleCancel} />
          <ModifyButton
            onClick={() => {
              setIsPosting(true);
              handleSubmit();
              setTimeout(() => {
                setIsPosting(false);
              }, 3000);
            }}
            disabled={
              hasErrors() || hasEmptyFields() || datesAreNotValid() || hasWrongLength() || isPosting
            }
          />
        </section>
      </form>
    </Card>
  );
};

export default UpdateTaskForm;
