import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';
import { TaskListTable } from '../../components/modules/Task/TaskListTable';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ProjectEntity } from '../../types/project';
import { APIPath, RequestMethods } from '../../utils/constants';

import ArchiveIcon from '@mui/icons-material/Archive';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { Box, Card } from '@mui/joy';
import { Chip } from '@mui/material';
import AddButton from '../../components/common/AddButton';
import StatusChip from '../../components/common/StatusChip';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import { SnackbarContext } from '../../hooks/snackbarContext';

type ProjectDetailsProps = {
  setProjectId: (projectId: string) => void;
};

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}/${month}/${year}`;
}

const chipStyle = {
  bgcolor: colors.lighterGray,
  fontSize: '1rem',
  minWidth: '5px0px',
  textTransform: 'lowercase',
};

const ProjectDetails = ({ setProjectId }: ProjectDetailsProps) => {
  const { id } = useParams();
  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.GET
  );

  const toggleModal = () => {
    setOpen(!open);
  };

  const updateArchive = () => {
    try {
      setState({ open: true, message: 'Project was archived succesfully', type: 'success' });
    } catch (error: any) {
      setState({ open: true, message: 'Project was could not be archived.', type: 'danger' });
    } finally {
      setOpen(false);
    }
  };

  const {
    data: company,
    loading: loadingCompany,
    sendRequest: getCompany,
    error: errorCompany,
  } = useHttp<{ data: CompanyEntity }>(
    `${APIPath.COMPANIES}/${data?.idCompany}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
    if (data && !company) {
      getCompany();
    }
    if (company) {
      setCompanyName(company.data.name);
    }
  }, [data, company]);

  if (loading && loadingCompany) {
    return <div>Loading...</div>;
  }

  if (error && errorCompany) {
    return <div>Error loading task</div>;
  }

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant='outlined'
          sx={{
            borderRadius: 'md',
            p: 4,
            boxShadow: 'lg',
            width: '500px',
          }}
        >
          <ModalClose variant='plain' sx={{ m: 1 }} />
          <Typography
            component='h2'
            id='modal-title'
            level='h3'
            textColor='inherit'
            fontWeight='lg'
            mb={1}
          >
            Archive Project
          </Typography>
          <Typography id='modal-desc' textColor='text.tertiary' sx={{ py: 1 }}>
            Are you sure you want to this project?
          </Typography>
          <Box mt={3} display='flex' alignItems='center' justifyContent='end' gap={2} sx={{}}>
            <Button
              onClick={() => setOpen(false)}
              variant='outlined'
              size='lg'
              sx={{
                color: colors.darkGold,
                borderColor: colors.darkGold,
                '&:hover': {
                  backgroundColor: colors.lightGold,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              size='lg'
              sx={{
                backgroundColor: colors.darkGold,
                '&:hover': {
                  backgroundColor: colors.darkerGold,
                },
              }}
              onClick={() => {
                updateArchive();
              }}
            >
              Archive
            </Button>
          </Box>
        </Sheet>
      </Modal>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <Link
          to='/projects'
          className='ml-auto text-darkGold no-underline'
          onClick={setProjectId('')}
        >
          <div className='flex items-center'>
            <img src={left_arrow} alt='Left arrow' className='w-3.5 mr-1' />
            {'Go Back'}
          </div>
        </Link>
      </Box>

      <Card className='bg-white' sx={{ Maxwidth: '300px', padding: '20px' }}>
        <section className='font-montserrat'>
          <section className='flex justify-between'>
            <h3 className='text-[22px] font-medium' style={{ marginTop: '15px' }}>
              {data?.name}
            </h3>
            <section className='flex justify-end gap-3'>
              <ArchiveIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer', color: colors.gold }}
                onClick={toggleModal}
              />
              <Link to={`/projects/report/${id}`}>
                <AssessmentOutlinedIcon
                  sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  className='text-gold'
                />
              </Link>

              <EditOutlinedIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                className='text-gold'
              />
            </section>
          </section>

          <p style={{ marginTop: '15px' }}>{data?.description}</p>

          <div className=' flex flex-wrap gap-10 pt-5 text-[10px]' style={{ color: colors.gray }}>
            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Status</p>
              {data && data.status !== undefined && <StatusChip status={data.status} />}
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Hours</p>
              <Chip
                sx={{
                  bgcolor: colors.extra,
                  fontSize: '1rem',
                }}
                label={data?.totalHours}
              />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Client</p>
              <Chip sx={chipStyle} label={companyName} />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Matter</p>
              <Chip sx={chipStyle} label={data?.matter} />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Category</p>
              <Chip sx={chipStyle} label={data?.category} />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Area</p>
              <Chip sx={chipStyle} label={data?.area} />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Periodicity</p>
              <Chip sx={chipStyle} label={data?.periodicity} />
            </div>

            <div style={{ fontSize: '15px' }}>
              <p style={{ marginLeft: '7px' }}>Chargeable</p>
              <Chip sx={chipStyle} label={data?.isChargeable ? 'Yes' : 'No'} />
            </div>
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, mb: 3, mr: 1, gap: 18 }}>
            <div className='flex items-center'>
              <EventNoteIcon sx={{ marginRight: '5px' }} />
              <p>Start Date: {data?.startDate && dateParser(data?.startDate)}</p>
            </div>

            <div className='flex items-center'>
              <EventNoteIcon sx={{ marginLeft: '5px' }} />
              <p>End Date: {data?.startDate && dateParser(data?.endDate)}</p>
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
      <Card className='bg-white' sx={{ Maxwidth: '300px', padding: '20px' }}>
        <TaskListTable projectId={id ? id : ''} />
      </Card>
    </>
  );
};

export default ProjectDetails;
