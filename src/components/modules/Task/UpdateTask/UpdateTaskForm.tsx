import { Grid, Input, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
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
import { Header, Item, StyledSheet } from '../styled';

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
        message: 'Description cannot be longer than 256 characters',
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
        message: 'Start date cannot be after due date.',
        type: 'danger',
      });
    } else if (
      startDate &&
      (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear())
    ) {
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
    } else if (
      endDate &&
      (!endDateJS?.getDate() || !endDateJS?.getMonth() || !endDateJS?.getFullYear())
    ) {
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

    if (!event.target.value.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, workedHours: 'Worked hours are required' }));
      setState({ open: true, message: 'Worked hours are required.', type: 'danger' });
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
    <StyledSheet className='p-10 py-4 h-[calc(100vh-190px)] overflow-scroll overflow-x-hidden'>
      <main className='flex flex-col gap-4'>
        <Header>
          Title <span className='text-red-600'>*</span>
        </Header>
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

        <Header>
          Description <span className='text-red-600'>*</span>
        </Header>
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
            border: `1px solid ${errors['description'] ? colors.danger : colors.lighterGray}`,
            '&:focus': {
              border: '1px solid' + colors.darkGold,
            },
          }}
        />

        {/* Date and status columns */}
        <Grid container spacing={2}>
          <Grid xs={2}>
            <Item>
              <Header>
                Start Date <span className='text-red-600'>*</span>
              </Header>
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
              <Header>Due Date</Header>
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
              <Header>
                Status <span className='text-red-600'>*</span>
              </Header>
              <GenericDropdown
                defaultValue={data.status as TaskStatus}
                options={Object.values(TaskStatus)}
                onChange={newVal => handleStatusSelect(newVal as TaskStatus)}
                placeholder='Select status'
                colorMap={statusColorMap}
              />
            </Item>
          </Grid>
        </Grid>

        {/* Assigned Employee, Worked Hours */}
        <Grid container spacing={2}>
          <Grid container xs={2} className='md mr-20'>
            <Item>
              <Header>Assigned Employee</Header>
              <GenericDropdown
                defaultValue={getSelectedEmployee(data.employeeFirstName, data.employeeLastName)}
                options={getEmployeeNames()}
                onChange={handleAssignedEmployee}
                placeholder='Select employee ...'
              />
            </Item>
          </Grid>
          <Grid container xs={2} className='md'>
            <Item className='ml-20'>
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
              <ModifyButton
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

export default UpdateTaskForm;
