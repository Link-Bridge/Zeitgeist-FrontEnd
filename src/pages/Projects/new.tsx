import { Button, Card, FormControl, FormLabel, Input, Select, Textarea } from '@mui/joy';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import useFetch from '../../hooks/useFetch';
import useNewProject from '../../hooks/useNewProject';
import { CompanyEntity } from '../../types/company';
import { Response } from '../../types/response';

const NewProject = () => {
  const { formState, handleChange, handleSubmit } = useNewProject();
  const values = ['1', '2', '3', '4'];

  const { data: companies } = useFetch<Response<CompanyEntity>>(
    'http://localhost:4000/api/v1/company'
  );
  return (
    <Card className='bg-white flex-1' sx={{ padding: '30px' }}>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
            <CustomSelect
              values={companies?.data?.map(company => company.name) ?? []}
              name='client'
              handleChange={handleChange}
            />
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
            type='submit'
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
