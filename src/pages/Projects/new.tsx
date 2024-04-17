import { Button, Card, FormControl, FormLabel, Input, Snackbar, Switch, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import Loader from '../../components/common/Loader';
import ClientDropdown from '../../components/modules/Projects/ClientDropdown';
import useFetch from '../../hooks/useFetch';
import useNewProject from '../../hooks/useNewProject';
import { CompanyEntity } from '../../types/company';
import { ProjectAreas, ProjectCategory, ProjectPeriodicity } from '../../types/project';
import { Response } from '../../types/response';

const NewProject = () => {
  const [openSnack, setOpenSnack] = useState(false);
  const form = useNewProject();
  const projectCategories = Object.values(ProjectCategory) as string[];
  const projectPeriodicity = Object.values(ProjectPeriodicity) as string[];
  const projectAreas = Object.values(ProjectAreas) as string[];
  const req = useFetch<Response<CompanyEntity>>('http://localhost:4000/api/v1/company');

  useEffect(() => {
    setOpenSnack(!!req.error || !!form.error);
    return () => {
      setTimeout(() => setOpenSnack(false), 2000);
    };
  }, [req.error, form.error]);

  if (form.success) {
    return <Navigate to='/projects' />;
  }

  return (
    <>
      <Card className='bg-white flex-1 font-montserrat' sx={{ padding: '30px' }}>
        {req.isLoading ? (
          <Loader />
        ) : (
          <form className='flex flex-col gap-4' onSubmit={form.handleSubmit}>
            <FormControl>
              <FormLabel className='font-montserrat'>
                Project Name <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                value={form.formState.projectName}
                onChange={e => {
                  form.handleChange('projectName', e.target.value);
                }}
              />
            </FormControl>
            <section className='flex flex-row gap-4'>
              <FormControl className='flex-1'>
                <FormLabel>
                  Client <span className='text-red-600'>*</span>
                </FormLabel>
                <ClientDropdown
                  values={req.data?.data ?? []}
                  name='client'
                  handleChange={form.handleChange}
                />
              </FormControl>
              <FormControl className='flex-1'>
                <FormLabel>
                  Category <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomSelect
                  values={projectCategories}
                  name='category'
                  handleChange={form.handleChange}
                />
              </FormControl>
              <FormControl className='flex-1'>
                <FormLabel>Matter</FormLabel>
                <Input
                  value={form.formState.matter}
                  onChange={e => {
                    form.handleChange('matter', e.target.value);
                  }}
                />
              </FormControl>
            </section>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                minRows={5}
                value={form.formState.description}
                onChange={e => {
                  form.handleChange('description', e.target.value);
                }}
              />
            </FormControl>
            <section className='lg:grid grid-cols-3 w-full gap-4'>
              <FormControl>
                <FormLabel>
                  Start Date <span className='text-red-600'>*</span>
                </FormLabel>
                <DatePicker
                  value={dayjs(form.formState.startDate)}
                  onChange={e => {
                    form.handleChange('startDate', e?.toDate() ?? form.formState.startDate);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <DatePicker
                  value={form.formState.endDate ? dayjs(form.formState.endDate) : null}
                  onChange={e => {
                    form.handleChange('endDate', e?.toDate() ?? null);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Chargable</FormLabel>
                <Switch
                  sx={{ mr: 'auto' }}
                  checked={form.formState.chargable}
                  onChange={e => {
                    form.handleChange('chargable', e.target.checked);
                  }}
                  size='lg'
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  Area <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomSelect
                  name='area'
                  handleChange={form.handleChange}
                  values={projectAreas}
                ></CustomSelect>
              </FormControl>
              <FormControl>
                <FormLabel>Periodic</FormLabel>
                <CustomSelect
                  name='periodic'
                  handleChange={form.handleChange}
                  values={projectPeriodicity}
                  defaultValue={ProjectPeriodicity.WHEN_NEEDED}
                ></CustomSelect>
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
                disabled={form.isPosting}
              >
                Add Project
              </Button>
            </section>
          </form>
        )}
      </Card>
      <Snackbar color='danger' variant='solid' open={openSnack}>
        {(req.error && 'Error getting clients') || form.error?.message}
      </Snackbar>
    </>
  );
};

export default NewProject;
