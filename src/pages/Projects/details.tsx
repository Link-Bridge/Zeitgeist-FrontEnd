import ArchiveIcon from '@mui/icons-material/Archive';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { Box, Button, Card, Chip as MuiChip, Option, Select, Typography } from '@mui/joy';
import { Chip } from '@mui/material';
import axios, { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import colors, { statusChipColorCombination } from '../../colors';
import AddButton from '../../components/common/AddButton';
import GenericDropdown from '../../components/common/GenericDropdown';
import GoBack from '../../components/common/GoBack';
import ModalEditConfirmation from '../../components/common/ModalEditConfirmation';
import { TaskListTable } from '../../components/modules/Task/TaskListTable';
import { SnackbarContext } from '../../hooks/snackbarContext';
import useDeleteTask from '../../hooks/useDeleteTask';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ProjectEntity, ProjectStatus } from '../../types/project';
import { Response } from '../../types/response';
import { TaskDetail } from '../../types/task';
import { APIPath, BASE_API_URL, RequestMethods, RoutesPath } from '../../utils/constants';
import { formatDate, truncateText } from '../../utils/methods';

const statusColorMap: Record<ProjectStatus, { bg: string; font: string }> = {
  [ProjectStatus.NONE]: statusChipColorCombination.default,
  [ProjectStatus.ACCEPTED]: statusChipColorCombination.accepted,
  [ProjectStatus.NOT_STARTED]: statusChipColorCombination.notStarted,
  [ProjectStatus.IN_PROGRESS]: statusChipColorCombination.inProgerss,
  [ProjectStatus.UNDER_REVISION]: statusChipColorCombination.underRevision,
  [ProjectStatus.IN_QUOTATION]: statusChipColorCombination.inQuotation,
  [ProjectStatus.DELAYED]: statusChipColorCombination.delayed,
  [ProjectStatus.POSTPONED]: statusChipColorCombination.postponed,
  [ProjectStatus.DONE]: statusChipColorCombination.done,
  [ProjectStatus.CANCELLED]: statusChipColorCombination.cancelled,
};

const chipStyle = {
  bgcolor: colors.orangeChip,
  fontSize: '1rem',
  minWidth: '5px0px',
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { setState } = useContext(SnackbarContext);
  const [initialTasks, setInitialTasks] = useState<TaskDetail[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [projectStatus, setProjectStatus] = useState<ProjectStatus>(ProjectStatus.NOT_STARTED);
  const [totalHours, setTotalHours] = useState<number>(0);
  const [updating, setUpdating] = useState(false);

  const [notFound, setNotFound] = useState(false);

  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.GET
  );

  const toggleModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isAxiosError(error)) {
      const message = error.response?.data.message;
      if (message.includes('Invalid uuid') || message.includes('unexpected error')) {
        setNotFound(true);
      }
    }
  }, [error]);

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
      setState({ open: true, message: 'Project status updated successfully!', type: 'success' });

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
      setState({ open: true, message: 'Task deleted successfully.', type: 'success' });
      setTimeout(() => {
        setState({ open: false, message: '' });
      }, 2000);
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

  async function changePayed(projectId: string, payed: boolean) {
    if (data) {
      setUpdating(true);
      const res = await axios.put(
        `${BASE_API_URL}/project/edit/${projectId}`,
        { payed, id: projectId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('idToken')}` } }
      );
      data.payed = res.data.data.payed;
      setUpdating(false);
    }
  }

  if (notFound) {
    return <Navigate to='/404' replace />;
  }

  return (
    <>
      {open && (
        <ModalEditConfirmation
          project={data!}
          open={open}
          setOpen={setOpen}
          refetch={sendRequest}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: '10px',
        }}
      >
        <GoBack />
      </Box>

      <Card className='bg-white' sx={{ Maxwidth: '300px', padding: '20px', border: 'none' }}>
        <section className='font-montserrat'>
          <section className='flex justify-between'>
            <h3 className='text-[22px] font-medium' style={{ marginTop: '10px' }}>
              {truncateText(data?.name)}
            </h3>
            <section className='flex justify-end gap-3'>
              <Button
                component={Link}
                to={`${RoutesPath.PROJECTS}/edit/${id}`}
                sx={{
                  backgroundColor: colors.lightWhite,
                  ':hover': {
                    backgroundColor: colors.orangeChip,
                  },
                  height: '5px',
                }}
                startDecorator={<EditOutlinedIcon sx={{ width: 24, color: colors.gold }} />}
              >
                <Typography sx={{ color: colors.gold }}>Edit</Typography>
              </Button>

              <Button
                component={Link}
                to={`/projects/report/${id}`}
                sx={{
                  backgroundColor: colors.lightWhite,
                  ':hover': {
                    backgroundColor: colors.orangeChip,
                  },
                  height: '5px',
                }}
                startDecorator={<AssessmentOutlinedIcon sx={{ width: 24, color: colors.gold }} />}
              >
                <Typography sx={{ color: colors.gold }}>Report</Typography>
              </Button>

              {data?.isArchived ? (
                <Button
                  onClick={toggleModal}
                  sx={{
                    backgroundColor: colors.lightWhite,
                    ':hover': {
                      backgroundColor: colors.orangeChip,
                    },
                    height: '5px',
                  }}
                  startDecorator={<UnarchiveIcon sx={{ width: 24, color: colors.gold }} />}
                >
                  {' '}
                  <Typography sx={{ color: colors.gold }}>Unarchive</Typography>
                </Button>
              ) : (
                <Button
                  onClick={toggleModal}
                  sx={{
                    backgroundColor: colors.lightWhite,
                    ':hover': {
                      backgroundColor: colors.orangeChip,
                    },
                    height: '5px',
                  }}
                  startDecorator={<ArchiveIcon sx={{ width: 24, color: colors.gold }} />}
                >
                  {' '}
                  <Typography sx={{ color: colors.gold }}>Archive</Typography>
                </Button>
              )}
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
                <Chip sx={chipStyle} label={truncateText(companyName, 20)} />
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
                <Chip sx={chipStyle} label={data.area} />
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
          <div className='flex items-center mt-4 gap-8'>
            {data?.isChargeable && (
              <div style={{ fontSize: '15px' }}>
                <p style={{ marginLeft: '7px' }}>Payed</p>
                <MuiChip
                  component={Select}
                  sx={chipStyle}
                  value={data?.payed ?? false}
                  onChange={(_, newVal) => {
                    changePayed(id ?? '', Boolean(newVal));
                  }}
                  disabled={updating}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </MuiChip>
              </div>
            )}
            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Is Archived</p>
              <Chip sx={chipStyle} label={data?.isArchived ? 'Yes' : 'No'} />
            </div>
          </div>

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
        <Link to={id ? `${RoutesPath.TASKS}/${id}/create` : RoutesPath.TASKS}>
          <AddButton onClick={() => {}} />
        </Link>
      </section>
      <Card className='bg-white overflow-auto' sx={{ Maxwidth: '300px', padding: '20px' }}>
        <TaskListTable
          errorTasks={errorTasks}
          loadingTasks={loadingTasks}
          initialTasks={initialTasks}
          onDelete={handleDeleteTask}
        />
      </Card>
    </>
  );
};

export default ProjectDetails;
