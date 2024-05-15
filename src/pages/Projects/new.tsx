/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, FormControl, FormLabel, Input, Switch, Textarea } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import colors from '../../colors';
import CustomSelect from '../../components/common/CustomSelect';
import Loader from '../../components/common/Loader';
import ClientDropdown from '../../components/modules/Projects/ClientDropdown';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useHttp from '../../hooks/useHttp';
import useNewProject from '../../hooks/useNewProject';
import { CompanyEntity } from '../../types/company';
import { ProjectAreas, ProjectCategory, ProjectPeriodicity } from '../../types/project';
import { RequestMethods } from '../../utils/constants';

const NewProject = () => {
  const { setState } = useContext(SnackbarContext);
  const form = useNewProject();
  const projectCategories = Object.values(ProjectCategory) as string[];
  const projectPeriodicity = Object.values(ProjectPeriodicity) as string[];
  const projectAreas = Object.values(ProjectAreas) as string[];
  const req = useHttp<CompanyEntity[]>('/company', RequestMethods.GET);

  const [initForm, setInitForm] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [startDate, setStartDate] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!initForm) {
      form.formState.name = '';
      form.formState.category = '';
      form.formState.matter = '';
      form.formState.description = '';
      form.formState.startDate = new Date();
      form.formState.endDate = null;
      form.formState.periodicity = ProjectPeriodicity.WHEN_NEEDED;
      form.formState.isChargeable = false;
      form.formState.area = '';
      setInitForm(true);
    }

    req.sendRequest();
  }, []);

  useEffect(() => {
    if (req.error) setState({ open: true, message: req.error.message, type: 'danger' });
  }, [req.error]);

  useEffect(() => {
    if (form.error) setState({ open: true, message: form.error.message, type: 'danger' });

    if (form.success)
      setState({ open: true, message: 'Project created sucessfully.', type: 'success' });
  }, [form.error, form.success]);

  useEffect(() => {
    handleRequiredFields();
  }, [form.formState, startDate]);

  const handleRequiredFields = () => {
    if (
      !form.formState.name ||
      !form.formState.idCompany ||
      !projectCategories.includes(form.formState.category) ||
      !startDate ||
      !form.formState.area
    )
      return setDisableButton(true);

    setDisableButton(false);
  };

  const isEndDateBeforeStartDate = () => {
    if (form.formState.startDate && form.formState.endDate) {
      if (dayjs(form.formState.startDate).isAfter(dayjs(form.formState.endDate))) {
        return true;
      }
    } else {
      return false;
    }
  };

  const isStartDateAfterEndDate = () => {
    if (form.formState.startDate && form.formState.endDate) {
      if (dayjs(form.formState.endDate).isBefore(dayjs(form.formState.startDate))) {
        return true;
      }
    } else {
      return false;
    }
  };

  const isInvalidStartDate = () => {
    const startDateJS = form.formState.startDate;
    if (
      form.formState.startDate &&
      (!startDateJS?.getDate() || !startDateJS?.getMonth() || !startDateJS?.getFullYear())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const isInvalidEndDate = () => {
    const endDateJS = form.formState.endDate;
    if (
      form.formState.endDate &&
      (!endDateJS?.getDate() || !endDateJS?.getMonth() || !endDateJS?.getFullYear())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const datesAreNotValid = () => {
    return (
      isEndDateBeforeStartDate() ||
      isStartDateAfterEndDate() ||
      isInvalidEndDate() ||
      isInvalidStartDate()
    );
  };

  if (form.success) {
    return <Navigate to={`/projects/details/${form.res!.data.id}`} replace />;
  }

  return (
    <Card className='bg-white flex-1 font-montserrat overflow-y-scroll' sx={{ padding: '30px' }}>
      {req.loading ? (
        <Loader />
      ) : (
        <form className='flex flex-col gap-4' onSubmit={form.handleSubmit}>
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
              className='min-w-0'
            />
          </FormControl>
          <section className='flex lg:flex-row gap-4 flex-col'>
            <FormControl className='flex-1'>
              <FormLabel>
                Client <span className='text-red-600'>*</span>
              </FormLabel>
              <ClientDropdown
                values={req.data ?? []}
                name='idCompany'
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
              maxRows={5}
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
          <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
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
                    return setStartDate(false);
                  }

                  if (form.formState.endDate && e && e.isAfter(dayjs(form.formState.endDate))) {
                    setState({
                      open: true,
                      message: 'Start date cannot be after end date.',
                      type: 'danger',
                    });
                    return setStartDate(false);
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
                    return setStartDate(false);
                  } else {
                    setErrors({ ...errors, startDate: '' });
                    setState({ open: false, message: '' });
                  }
                  setStartDate(true);
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
          </section>
          <section className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
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
                name='periodicity'
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
              disabled={disableButton || form.isPosting || datesAreNotValid()}
            >
              Add Project
            </Button>
          </section>
          {/* Snackbar */}
        </form>
      )}
    </Card>
  );
};

export default NewProject;
