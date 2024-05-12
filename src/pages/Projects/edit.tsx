import { Button, Card, FormControl, FormLabel, Input, Switch, Textarea } from '@mui/joy';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import CustomDatePicker from '../../components/common/DatePicker';
import Loader from '../../components/common/Loader';
import ClientDropdown from '../../components/modules/Projects/ClientDropdown';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import useNewProject from '../../hooks/useNewProject';
import { CompanyEntity } from '../../types/company';
import {
  ProjectAreas,
  ProjectCategory,
  ProjectEntity,
  ProjectPeriodicity,
} from '../../types/project';
import { APIPath, RequestMethods } from '../../utils/constants';

const EditProject = () => {
  const { id } = useParams();
  const { setState } = useContext(SnackbarContext);
  const form = useNewProject();

  const projectCategories = Object.values(ProjectCategory) as string[];
  const projectPeriodicity = Object.values(ProjectPeriodicity) as string[];
  const projectAreas = Object.values(ProjectAreas) as string[];

  const {
    data: project,
    loading: loadingProject,
    sendRequest: getProject,
    error: errorProject,
  } = useHttp<ProjectEntity>(`${APIPath.PROJECT_DETAILS}/${id}`, RequestMethods.GET);

  const {
    data: companies,
    loading: loadingCompanies,
    sendRequest: getCompanies,
    error: errorCompanies,
  } = useHttp<CompanyEntity[]>(APIPath.COMPANIES, RequestMethods.GET);

  useEffect(() => {
    if (!errorCompanies && !errorProject) {
      if (!project) getProject();
      if (!companies) getCompanies();

      if (project) {
        form.formState.id = id;
        form.formState.name = project.name;
        form.formState.category = project.category;
        form.formState.matter = project.matter;
        form.formState.description = project.description;
        form.formState.startDate = project.startDate;
        form.formState.endDate = project.endDate;
        form.formState.isChargeable = project.isChargeable;
        form.formState.area = project.area;
        form.formState.periodicity = project.periodicity;
      }

      if (project && companies) {
        companies.forEach(company => {
          if (company.id == project?.idCompany) {
            form.formState.idCompany = company.id;
          }
        });
      }
    }

    if (errorCompanies) setState({ open: true, message: errorCompanies.message, type: 'danger' });
    if (errorProject) setState({ open: true, message: errorProject.message, type: 'danger' });

    if (form.error) setState({ open: true, message: form.error.message, type: 'danger' });
    if (form.success)
      setState({ open: true, message: 'Project updated sucessfully!', type: 'success' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, companies, errorProject, errorCompanies, form.error, form.success, setState]);

  if (form.success) {
    return <Navigate to='/projects' />;
  }

  return (
    <>
      {(loadingCompanies || loadingProject) && <Loader />}
      {(errorCompanies || errorProject) && <h1>An unexpected error occurred. Please try again.</h1>}
      {!(errorCompanies || errorProject) && !loadingCompanies && !loadingProject && (
        <Card
          className='bg-white flex-1 min-h-0 lg:overflow-y-hidden overflow-y-scroll'
          sx={{ padding: '30px' }}
        >
          <form className='flex flex-col gap-4' onSubmit={form.handleUpdate}>
            <FormControl className='pb-3 pt-3'>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                Project Name <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                value={form.formState.name}
                onChange={e => form.handleChange('name', e.target.value)}
              />
            </FormControl>
            <section className='flex flex-wrap gap-4'>
              <FormControl className='pb-3 pt-3 flex-1'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Client <span className='text-red-600'>*</span>
                </FormLabel>
                <ClientDropdown
                  values={companies ?? []}
                  name='idCompany'
                  handleChange={form.handleChange}
                  defaultValue={form.formState.idCompany}
                />
              </FormControl>
              <FormControl className='pb-3 pt-3 flex-1'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Category <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomSelect
                  values={projectCategories}
                  name='category'
                  defaultValue={form.formState.category}
                  handleChange={form.handleChange}
                />
              </FormControl>
              <FormControl className='pb-3 pt-3 flex-1'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Matter</FormLabel>
                <Input
                  value={form.formState.matter}
                  onChange={e => form.handleChange('matter', e.target.value)}
                />
              </FormControl>
            </section>
            <FormControl className='pb-3 pt-3'>
              <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Description</FormLabel>
              <Textarea
                minRows={5}
                value={form.formState.description}
                onChange={e => form.handleChange('description', e.target.value)}
                sx={{
                  width: '100%',
                  height: '150px',
                  padding: '10px',
                  borderRadius: '4px',
                }}
              />
            </FormControl>
            <section className='lg:flex flex-wrap gap-4'>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Start Date <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomDatePicker
                  value={dayjs(form.formState.startDate)}
                  onChange={e =>
                    form.handleChange('startDate', e?.toDate() ?? form.formState.startDate)
                  }
                />
              </FormControl>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>End Date</FormLabel>
                <CustomDatePicker
                  value={form.formState.endDate ? dayjs(form.formState.endDate) : null}
                  onChange={e => form.handleChange('endDate', e?.toDate() ?? null)}
                />
              </FormControl>
              <FormControl className='pb-3 pt-3'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Chargeable</FormLabel>
                <Switch
                  sx={{ mr: 'auto' }}
                  checked={form.formState.isChargeable}
                  onChange={e => form.handleChange('isChargeable', e.target.checked)}
                  size='lg'
                />
              </FormControl>
            </section>
            <section className='lg:flex flex-wrap gap-2'>
              <FormControl className='pb-3 pt-3 w-1/4'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                  Area <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomSelect
                  name='area'
                  defaultValue={form.formState.area}
                  handleChange={form.handleChange}
                  values={projectAreas}
                ></CustomSelect>
              </FormControl>
              <FormControl className='pb-3 pt-3 w-1/4'>
                <FormLabel sx={{ fontWeight: 'bold', fontSize: '16px' }}>Periodic</FormLabel>
                <CustomSelect
                  name='periodicity'
                  defaultValue={form.formState.periodicity}
                  handleChange={form.handleChange}
                  values={projectPeriodicity}
                ></CustomSelect>
              </FormControl>
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
                Update Project
              </Button>
            </section>
          </form>
        </Card>
      )}
    </>
  );
};

export default EditProject;
