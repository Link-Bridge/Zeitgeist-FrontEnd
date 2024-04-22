import { Grid, Input, Textarea } from '@mui/joy';
import dayjs from 'dayjs';
import { useState } from 'react';
import { BareboneTask } from '../../../../types/task';
import { TaskStatus } from '../../../../types/task-status';
import { WaitingFor } from '../../../../types/waiting-for';
import CancelButton from '../../../common/CancelButton';
import CustomDatePicker from '../../../common/DatePicker';
import GenericDropdown from '../../../common/GenericDropdown';
import SendButton from '../../../common/SendButton';
import { Header, Item, StyledSheet } from './styled';

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISSION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
};

interface NewTaskFormProps {
  onSubmit: (payload: BareboneTask) => Promise<void>;
}

/**
 * New Task form component
 *
 * @component
 * @param {NewTaskFormProps} props - Component props
 *
 * @returns {JSX.Element} New Task form component
 */
const NewTaskForm: React.FC<NewTaskFormProps> = ({ onSubmit }: NewTaskFormProps): JSX.Element => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [dueDate, setDueDate] = useState<dayjs.Dayjs | null>(null);
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [waitingFor, setWaitingFor] = useState<WaitingFor | ''>('');
  const [workedHours, setWorkedHours] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string | null>('');

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

  const handleWaitingForSelect = (value: WaitingFor) => {
    setWaitingFor(value);
  };

  const handleWorkedHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkedHours(event.target.value);
  };

  const handleProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!title || !description || !startDate || !dueDate || !status || !projectName) {
      console.error('Please fill in all required fields');
      return;
    }

    const payload = {
      title,
      description,
      status: status.toUpperCase() as TaskStatus,
      waitingFor: waitingFor,
      startDate: startDate.toISOString() ?? null,
      dueDate: dueDate.toISOString() ?? null,
      workedHours: workedHours ?? '0.0',
      idProject: '5cb76036-760d-4622-8a54-ec25a872def5',
    };

    try {
      await onSubmit(payload);
    } catch (error: any) {
      console.error('Error creating task', error.code);
    }
  };

  return (
    <StyledSheet>
      <Header>Title *</Header>
      <Input
        type='text'
        placeholder='Write your text here... '
        value={title}
        onChange={handleTitleChange}
        sx={{ color: '#BDBDBD' }}
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
          border: '1px solid #E0E0E0',
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
            <CustomDatePicker value={startDate} onChange={handleStartDateChange} />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Due Date *</Header>
            <CustomDatePicker value={dueDate} onChange={handleDueDateChange} />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Status *</Header>
            <GenericDropdown
              options={Object.values(TaskStatus)}
              onSelect={handleStatusSelect}
              placeholder='Select status'
              colorMap={statusColorMap}
            />
          </Item>
        </Grid>
      </Grid>

      {/* Waiting For, Worked Hours, Project Name */}
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Item>
            <Header>Waiting For ...</Header>
            <GenericDropdown
              options={Object.values(WaitingFor)}
              onSelect={handleWaitingForSelect}
              placeholder='Select waiting for ...'
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Worked Hours</Header>
            <Input
              placeholder='00.00'
              type='text'
              value={workedHours ?? ''}
              onChange={handleWorkedHoursChange}
            />
          </Item>
        </Grid>
        <Grid>
          <Item>
            <Header>Project Name *</Header>
            <Input
              type='text'
              placeholder='Project name'
              value={projectName ?? ''}
              onChange={handleProjectNameChange}
            />
          </Item>
        </Grid>
      </Grid>

      {/* Cancel & send button */}
      <Grid container justifyContent='flex-end'>
        <Grid>
          <Item>
            <CancelButton />
          </Item>
        </Grid>
        <Grid>
          <Item>
            <SendButton onClick={handleSubmit} />
          </Item>
        </Grid>
      </Grid>
    </StyledSheet>
  );
};

export default NewTaskForm;
