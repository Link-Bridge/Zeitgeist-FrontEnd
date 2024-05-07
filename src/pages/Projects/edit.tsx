import { Button, Card, FormControl, FormLabel, Input, Switch, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
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
          className='bg-white flex-1 font-montserrat min-h-0 lg:overflow-y-hidden overflow-y-scroll'
          sx={{ padding: '30px' }}
        >
          <form className='flex flex-col gap-4' onSubmit={form.handleUpdate}>
            <FormControl>
              <FormLabel className='font-montserrat'>
                Project Name <span className='text-red-600'>*</span>
              </FormLabel>
              <Input
                value={form.formState.name}
                onChange={e => {
                  form.handleChange('name', e.target.value);
                }}
              />
            </FormControl>
            <section className='flex flex-row gap-4'>
              <FormControl className='flex-1'>
                <FormLabel>
                  Client <span className='text-red-600'>*</span>
                </FormLabel>
                <ClientDropdown
                  values={companies ?? []}
                  name='idCompany'
                  handleChange={form.handleChange}
                  defaultValue={form.formState.idCompany}
                />
              </FormControl>
              <FormControl className='flex-1'>
                <FormLabel>
                  Category <span className='text-red-600'>*</span>
                </FormLabel>
                <CustomSelect
                  values={projectCategories}
                  defaultValue={form.formState.category}
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
                <FormLabel>Chargeable</FormLabel>
                <Switch
                  sx={{ mr: 'auto' }}
                  checked={form.formState.isChargeable}
                  onChange={e => {
                    form.handleChange('isChargeable', e.target.checked);
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
                  defaultValue={
                    form.formState.area.charAt(0).toUpperCase() +
                    form.formState.area.slice(1).toLowerCase()
                  }
                ></CustomSelect>
              </FormControl>
              <FormControl>
                <FormLabel>Periodic</FormLabel>
                <CustomSelect
                  name='periodicity'
                  handleChange={form.handleChange}
                  values={projectPeriodicity}
                  defaultValue={form.formState.periodicity}
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
