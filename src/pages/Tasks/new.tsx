import { Grid, Input, Sheet, Textarea } from '@mui/joy';
import { styled } from '@mui/material/styles';
import CancelButton from '../../components/common/CancelButton';
import CustomDatePicker from '../../components/common/DatePicker';
import GenericDropdown from '../../components/common/GenericDropdown';
import SendButton from '../../components/common/SendButton';

enum TaskStatus {
  NOT_STARTED = 'NOT STARTED',
  IN_PROGRESS = 'IN PROGRESS',
  UNDER_REVISSION = 'UNDER REVISSION',
  DELAYED = 'DELAYED',
  POSTPONED = 'POSTPONED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

enum WaitingFor {
  CLIENT = 'CLIENT',
  TEAM = 'TEAM',
  VENDOR = 'VENDOR',
  OTHER = 'OTHER',
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
