import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import colors from '../../colors';
import GoBack from '../../components/common/GoBack';
import { TaskListTable } from '../../components/modules/Task/TaskListTable';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ProjectAreas, ProjectEntity } from '../../types/project';
import { APIPath, RequestMethods, RoutesPath } from '../../utils/constants';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { Box, Card } from '@mui/joy';
import { Chip } from '@mui/material';
import AddButton from '../../components/common/AddButton';

import GenericDropdown from '../../components/common/GenericDropdown';
import { SnackbarState } from '../../hooks/snackbarContext';
import useDeleteTask from '../../hooks/useDeleteTask';
import { ProjectStatus } from '../../types/project';
import { Response } from '../../types/response';
import { TaskDetail } from '../../types/task';
import { formatDate } from '../../utils/methods';

const statusColorMap: Record<ProjectStatus, string> = {
  [ProjectStatus.ACCEPTED]: colors.gold,
  [ProjectStatus.NOT_STARTED]: colors.notStarted,
  [ProjectStatus.IN_PROGRESS]: colors.darkPurple,
  [ProjectStatus.UNDER_REVISION]: colors.purple,
  [ProjectStatus.IN_QUOTATION]: colors.darkerBlue,
  [ProjectStatus.DELAYED]: colors.delayed,
  [ProjectStatus.POSTPONED]: colors.blue,
  [ProjectStatus.DONE]: colors.success,
  [ProjectStatus.CANCELLED]: colors.danger,
};

const chipStyle = {
  bgcolor: colors.lighterGray,
  fontSize: '1rem',
  minWidth: '5px0px',
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const [initialTasks, setInitialTasks] = useState<TaskDetail[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(ProjectStatus.NOT_STARTED);
  const [totalHours, setTotalHours] = useState<number>(0);

  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.GET
  );

  const {
    data: company,
    loading: loadingCompany,
    sendRequest: getCompany,
    error: errorCompany,
  } = useHttp<{ data: CompanyEntity }>(
    `${APIPath.COMPANIES}/${data?.idCompany}`,
    RequestMethods.GET
  );

  const {
    data: tasks,
    error: errorTasks,
    loading: loadingTasks,
    sendRequest: getTasks,
  } = useHttp<Response<TaskDetail>>(`/tasks/project/${id}`, RequestMethods.GET);

  useEffect(() => {
    if (!tasks) getTasks();
    if (tasks && tasks.data) {
      setInitialTasks(tasks.data);

      setTotalHours(() =>
        initialTasks.reduce((totalHours, task) => totalHours + (task.workedHours || 0), 0)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const { data: updatedCompany, sendRequest: updateStatus } = useHttp<{ data: CompanyEntity }>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.PUT
  );

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
    if (data && !company) {
      getCompany();
      setProjectStatus(data.status);
    }
    if (company) {
      setCompanyName(company.data.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, company, updatedCompany, projectStatus]);

  const handleStatusChange = async (newStatus: ProjectStatus) => {
    try {
      await updateStatus({}, { status: newStatus }, { 'Content-Type': 'application/json' });

      if (updatedCompany) {
        setProjectStatus(newStatus);
      }
    } catch (error) {
      setState({ open: true, message: `Error updating project status: ${error}`, type: 'danger' });
    }
  };

  const deleteTask = useDeleteTask();
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask.deleteTask(taskId);
    } catch (error) {
      setState({ open: true, message: `Error deleting task: ${error}`, type: 'danger' });
    } finally {
      getTasks();
    }
  };

  if (loading && loadingCompany) {
    return <div>Loading...</div>;
  }

  if (error && errorCompany) {
    return <div>Error loading task</div>;
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      <Card className='bg-white' sx={{ Maxwidth: '300px', padding: '20px' }}>
        <section className='font-montserrat'>
          <section className='flex justify-between'>
            <h3 className='text-[22px] font-medium' style={{ marginTop: '15px' }}>
              {data?.name}
            </h3>
            <section className='flex justify-end gap-3'>
              <Link to={`/projects/report/${id}`}>
                <AssessmentOutlinedIcon
                  sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  className='text-gold'
                />
              </Link>

              <Link to={`${RoutesPath.PROJECTS}/edit/${id}`}>
                <EditOutlinedIcon
                  sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  className='text-gold'
                />
              </Link>
            </section>
          </section>

          <p style={{ marginTop: '15px' }}>{data?.description}</p>

          {data && (
            <div className=' flex flex-wrap gap-10 pt-5 text-[10px]' style={{ color: colors.gray }}>
              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Status</p>
                {data && data.status !== undefined && (
                  <GenericDropdown
                    options={Object.values(ProjectStatus)}
                    onValueChange={handleStatusChange}
                    defaultValue={projectStatus}
                    colorMap={statusColorMap}
                    placeholder='Select status ...'
                  />
                )}
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Hours</p>
                <Chip
                  sx={{
                    bgcolor: colors.extra,
                    fontSize: '1rem',
                  }}
                  label={totalHours}
                />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Client</p>
                <Chip sx={chipStyle} label={companyName} />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Matter</p>
                <Chip sx={chipStyle} label={data.matter} />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Category</p>
                <Chip sx={chipStyle} label={data?.category} />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Area</p>
                <Chip sx={chipStyle} label={ProjectAreas[data.area]} />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Periodicity</p>
                <Chip sx={chipStyle} label={data.periodicity} />
              </div>

              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Chargeable</p>
                <Chip sx={chipStyle} label={data.isChargeable ? 'Yes' : 'No'} />
              </div>
            </div>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, mb: 3, mr: 1, gap: 18 }}>
            <div className='flex items-center'>
              <EventNoteIcon />
              <p className='ml-3'>Start Date: {data?.startDate && formatDate(data?.startDate)}</p>
            </div>

            <div className='flex items-center'>
              <EventNoteIcon />
              <p className='ml-3'>End Date: {data?.startDate && formatDate(data?.endDate)}</p>
            </div>
          </Box>
        </section>
      </Card>

      <section className='flex justify-between my-6'>
        <h1 className='text-[30px] text-gold'>Project Tasks</h1>
        <Link to={id ? APIPath.CREATE_TASK.replace(':projectId', id) : ''}>
          <AddButton onClick={() => {}} />
        </Link>
      </section>
      <Card className='bg-white overflow-auto' sx={{ Maxwidth: '300px', padding: '20px' }}>
        <TaskListTable
          errorTasks={errorTasks}
          loadingTasks={loadingTasks}
          initialTasks={initialTasks}
          getTasks={getTasks}
          onDelete={handleDeleteTask}
        />
      </Card>
    </>
  );
};

export default ProjectDetails;
