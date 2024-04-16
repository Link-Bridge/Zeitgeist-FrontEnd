import { Button, Card, FormControl, FormLabel, Input, Snackbar, Switch, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import Loader from '../../components/common/Loader';
import useFetch from '../../hooks/useFetch';
import useNewProject from '../../hooks/useNewProject';
import { CompanyEntity } from '../../types/company';
import { ProjectCategory, ProjectPeriodicity } from '../../types/project';
import { Response } from '../../types/response';

const NewProject = () => {
  const { formState, handleChange, handleSubmit, isPosting, error: postError } = useNewProject();
  const projectCategories = Object.values(ProjectCategory) as string[];
  const projectPeriodicity = Object.values(ProjectPeriodicity) as string[];
  const [openSnack, setOpenSnack] = useState(false);
  const {
    data: companies,
    isLoading,
    error,
  } = useFetch<Response<CompanyEntity>>('http://localhost:4000/api/v1/company');

  useEffect(() => {
    setOpenSnack(!!error || !!postError);
    return () => {
      setTimeout(() => setOpenSnack(false), 2000);
    };
  }, [error, postError]);

  return (
    <>
      <Card className='bg-white flex-1' sx={{ padding: '30px' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Project Name*</FormLabel>
              <Input
                value={formState.projectName}
                onChange={e => {
                  handleChange('projectName', e.target.value);
                }}
              />
            </FormControl>
            <section className='flex flex-row gap-4'>
              <FormControl className='flex-1'>
                <FormLabel>Client*</FormLabel>
                <CustomSelect
                  values={companies?.data?.map(company => company.name) ?? []}
                  name='client'
                  handleChange={handleChange}
                />
              </FormControl>
              <FormControl className='flex-1'>
                <FormLabel>Category*</FormLabel>
                <CustomSelect
                  values={projectCategories}
                  name='category'
                  handleChange={handleChange}
                />
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
                <FormLabel>Start Date*</FormLabel>
                <DatePicker
                  value={dayjs(formState.startDate)}
                  onChange={e => {
                    handleChange('startDate', e?.toDate() ?? formState.startDate);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <DatePicker
                  value={formState.endDate ? dayjs(formState.endDate) : null}
                  onChange={e => {
                    handleChange('endDate', e?.toDate() ?? null);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Periodic</FormLabel>
                <CustomSelect
                  name='periodic'
                  handleChange={handleChange}
                  values={projectPeriodicity}
                  defaultValue={ProjectPeriodicity.WHEN_NEEDED}
                ></CustomSelect>
              </FormControl>
              <FormControl>
                <FormLabel>Chargable</FormLabel>
                <Switch
                  checked={formState.chargable}
                  onChange={e => {
                    handleChange('chargable', e.target.checked);
                  }}
                />
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
                disabled={isPosting}
              >
                Add Project
              </Button>
            </section>
          </form>
        )}
      </Card>
      <Snackbar color='danger' variant='solid' open={openSnack}>
        {(error && 'Error getting clients') || postError?.message}
      </Snackbar>
    </>
  );
};

export default NewProject;
