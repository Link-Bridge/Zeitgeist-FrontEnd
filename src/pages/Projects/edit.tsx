import { Button, Card, FormControl, FormLabel, Input, Switch, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import Loader from '../../components/common/Loader';
import ClientDropdown from '../../components/modules/Projects/ClientDropdown';
import { EmployeeContext } from '../../hooks/employeeContext';
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
  const location = useLocation();
  const { id } = useParams();

  const { employee } = useContext(EmployeeContext);
  const { setState } = useContext(SnackbarContext);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const form = useNewProject();
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const projectCategories = Object.values(ProjectCategory) as string[];
  const projectPeriodicity = Object.values(ProjectPeriodicity) as string[];
  const projectAreas = Object.values(ProjectAreas) as string[];

  const [admin, setAdmin] = useState(false);

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
    setAdmin(employee?.role === 'Admin');
  }, [employee]);

  useEffect(() => {
    if (!errorCompanies && !errorProject) {
      if (!project) getProject();
      if (!companies) getCompanies();

      if (project) {
        form.setState(project);
        handleRequiredFields();
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
      setState({ open: true, message: 'Project updated successfully.', type: 'success' });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, companies, errorProject, errorCompanies, form.error, form.success, setState]);

  useEffect(() => {
    handleRequiredFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState]);

  const handleRequiredFields = () => {
    console.log(form.formState.startDate);
    if (
      !form.formState.name ||
      !form.formState.idCompany ||
      !projectCategories.includes(form.formState.category) ||
      !form.formState.startDate ||
      !form.formState.area
    )
      return setDisableButton(true);

    setDisableButton(false);
  };

  const isEndDateBeforeStartDate = () => {
    if (form.formState.startDate && form.formState.endDate) {
      return dayjs(form.formState.startDate).isAfter(dayjs(form.formState.endDate));
    } else {
      return false;
    }
  };

  const isInvalidStartDate = () => {
    const startDateJS = form.formState.startDate ? new Date(form.formState.startDate) : null;
    if (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear()) {
      return true;
    } else {
      return false;
    }
  };

  const isInvalidEndDate = () => {
    const endDateJS = form.formState.endDate ? new Date(form.formState.endDate) : null;
    if (endDateJS === null) {
      return false;
    }
    if (!endDateJS.getDate() || !endDateJS.getMonth() || !endDateJS.getFullYear()) {
      return true;
    } else {
      return false;
    }
  };

  const datesAreNotValid = () => {
    return isEndDateBeforeStartDate() || isInvalidEndDate() || isInvalidStartDate();
  };

  if (form.success) {
    return <Navigate to={`/projects/details/${id}`} state={location.state} replace />;
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
                  if (e.target.value.length > 70) {
                    return setState({
                      open: true,
                      message: 'Project name cannot be longer than 70 characters.',
                      type: 'danger',
                    });
                  } else if (!e.target.value || e.target.value.length == 0) {
                    setErrors({ ...errors, name: 'Project name is required.' });
                    setState({
                      open: true,
                      message: 'Project name is required.',
                      type: 'danger',
                    });
                  } else {
                    setErrors({ ...errors, name: '' });
                    setState({ open: false, message: '' });
                  }
                  form.handleChange('name', e.target.value);
                }}
                sx={{
                  borderRadius: '4px',
                  border: `1px solid ${errors['name'] ? colors.danger : colors.lighterGray}`,
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
                    if (e.target.value.length > 70) {
                      return setState({
                        open: true,
                        message: 'Matter cannot be longer than 70 characters.',
                        type: 'danger',
                      });
                    } else {
                      setErrors({ ...errors, name: '' });
                      setState({ open: false, message: '' });
                    }
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
                  if (e.target.value.length > 255) {
                    return setState({
                      open: true,
                      message: 'Description cannot be longer than 255 characters.',
                      type: 'danger',
                    });
                  } else {
                    setErrors({ ...errors, name: '' });
                    setState({ open: false, message: '' });
                  }
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
                    if (!e?.toDate()) {
                      setState({
                        open: true,
                        message: 'Start date is required.',
                        type: 'danger',
                      });
                    }

                    if (form.formState.endDate && e && e.isAfter(dayjs(form.formState.endDate))) {
                      setState({
                        open: true,
                        message: 'Start date cannot be after end date.',
                        type: 'danger',
                      });
                    } else if (
                      e &&
                      (!e?.toDate()?.getDate() ||
                        !e?.toDate()?.getMonth() ||
                        !e?.toDate()?.getFullYear())
                    ) {
                      setState({
                        open: true,
                        message: 'Please enter a valid date.',
                        type: 'danger',
                      });
                    } else {
                      setErrors({ ...errors, startDate: '' });
                      setState({ open: false, message: '' });
                    }
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>End Date</FormLabel>
                <DatePicker
                  value={form.formState.endDate ? dayjs(form.formState.endDate) : null}
                  onChange={e => {
                    form.handleChange('endDate', e?.toDate() ?? null);
                    if (
                      form.formState.startDate &&
                      e &&
                      e.isBefore(dayjs(form.formState.startDate))
                    ) {
                      setState({
                        open: true,
                        message: 'End date cannot be before start date.',
                        type: 'danger',
                      });
                    } else if (
                      e &&
                      (!e?.toDate()?.getDate() ||
                        !e?.toDate()?.getMonth() ||
                        !e?.toDate()?.getFullYear())
                    ) {
                      setState({
                        open: true,
                        message: 'Please enter a valid date.',
                        type: 'danger',
                      });
                    } else {
                      setErrors({ ...errors, endDate: '' });
                      setState({ open: false, message: '' });
                    }
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
              <FormControl disabled={!employee?.role || employee.role !== 'Admin'}>
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
                  disabled={!admin}
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
                <Link to={`/projects/details/${id}`} state={location.state} replace>
                  Cancel
                </Link>
              </Button>
              <Button
                type='submit'
                sx={{
                  background: colors.darkGold,
                  '&:hover': {
                    backgroundColor: colors.darkerGold,
                  },
                }}
                disabled={disableButton || form.isPosting || datesAreNotValid()}
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
