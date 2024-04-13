import { Button, Card, FormControl, FormLabel, Input, Select, Textarea } from '@mui/joy';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import useNewProject from '../../hooks/useNewProject';

const NewProject = () => {
  const { formState, handleChange } = useNewProject();
  console.log(formState);
  const values = ['1', '2', '3', '4'];

  return (
    <Card className='bg-white flex-1' sx={{ padding: '30px' }}>
      <form action='' className='flex flex-col gap-4'>
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input
            value={formState.projectName}
            onChange={e => {
              handleChange('projectName', e.target.value);
            }}
          />
        </FormControl>
        <section className='flex flex-row gap-4'>
          <FormControl className='flex-1'>
            <FormLabel>Client</FormLabel>
            <CustomSelect values={values} name='client' handleChange={handleChange} />
          </FormControl>
          <FormControl className='flex-1'>
            <FormLabel>Category</FormLabel>
            <CustomSelect values={values} name='category' handleChange={handleChange} />
          </FormControl>
          <FormControl className='flex-1'>
            <FormLabel>Matter</FormLabel>
            <Input
              value={formState.matter}
              onChange={e => {
                handleChange('matter', e.target.value);
              }}
            />
          </FormControl>
        </section>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            minRows={5}
            value={formState.description}
            onChange={e => {
              handleChange('description', e.target.value);
            }}
          />
        </FormControl>
        <section className='grid grid-cols-2 w-full gap-4'>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>Periodic</FormLabel>
            <Select />
          </FormControl>
          <FormControl>
            <FormLabel>Chargable</FormLabel>
            <Select />
          </FormControl>
        </section>
        <section className='flex mt-10 gap-4 justify-end'>
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
          >
            <Link to={'..'}>Cancel</Link>
          </Button>
          <Button
            sx={{
              background: colors.darkGold,
              '&:hover': {
                backgroundColor: colors.darkerGold,
              },
            }}
          >
            Add Project
          </Button>
        </section>
      </form>
    </Card>
  );
};

export default NewProject;
