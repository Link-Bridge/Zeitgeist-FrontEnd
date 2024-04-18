import { Grid, Input, Sheet, Textarea } from '@mui/joy';
import { styled } from '@mui/material/styles';
import CancelButton from '../../components/common/CancelButton';
import CustomDatePicker from '../../components/common/DatePicker';
import GenericDropdown from '../../components/common/GenericDropdown';
import SendButton from '../../components/common/SendButton';

enum TaskStatus {
  NOT_STARTED = 'Not Started',
  IN_PROGRESS = 'In Progress',
  UNDER_REVISSION = 'Under Revission',
  DELAYED = 'Delayed',
  POSTPONED = 'Postponed',
  DONE = 'Done',
  CANCELLED = 'Cancelled',
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: '#E6A9A9',
  [TaskStatus.IN_PROGRESS]: '#FFE598',
  [TaskStatus.UNDER_REVISSION]: '#D7B2F0',
  [TaskStatus.DELAYED]: '#FFC774',
  [TaskStatus.POSTPONED]: '#A0C5E8',
  [TaskStatus.DONE]: '#6AA84F',
  [TaskStatus.CANCELLED]: '#FF7A7A',
};

enum WaitingFor {
  CLIENT = 'Client',
  TEAM = 'Team',
  VENDOR = 'Vendor',
  OTHER = 'Other',
}

const StyledSheet = styled(Sheet)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '0.6rem',
}));

const Header = styled('h1')(({}) => ({
  color: '#686868',
  fontWeight: 'bold',
  margin: '10px 0',
}));

const Item = styled(Sheet)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'left',
  borderRadius: 8,
}));

const newTask = () => {
  return (
    <StyledSheet>
      <Header>Title *</Header>
      <Input type='text' placeholder='Write your text here... ' sx={{ color: '#BDBDBD' }} />

      <Header>Description *</Header>
      <Textarea
        placeholder='Write your text here... '
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
            <CustomDatePicker />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Due Date *</Header>
            <CustomDatePicker />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Status *</Header>
            <GenericDropdown
              options={Object.values(TaskStatus)}
              onSelect={value => console.log(value)}
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
              onSelect={value => console.log(value)}
              placeholder='Select status'
            />
          </Item>
        </Grid>
        <Grid xs={2}>
          <Item>
            <Header>Worked Hours</Header>
            <Input placeholder='00' type='number' />
          </Item>
        </Grid>
        <Grid>
          <Item>
            <Header>Project Name *</Header>
            <Input type='text' placeholder='Project name' />
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
            <SendButton />
          </Item>
        </Grid>
      </Grid>
    </StyledSheet>
  );
};

export default newTask;
