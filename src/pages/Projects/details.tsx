import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';
import { TaskListTable } from '../../components/modules/Task/TaskListTable';
import useHttp from '../../hooks/useHttp';
import { CompanyEntity } from '../../types/company';
import { ProjectEntity } from '../../types/project';
import { APIPath, RequestMethods, RoutesPath } from '../../utils/constants';

import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';

import { Box, Card, Chip, Option, Select } from '@mui/joy';
import axios from 'axios';
import AddButton from '../../components/common/AddButton';
import StatusChip from '../../components/common/StatusChip';
import InfoChip from '../../components/modules/Projects/InfoChip';

function dateParser(date: Date): string {
  if (!date) return '';
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
};

const ProjectDetails = () => {
  const { id } = useParams();
  const [companyName, setCompanyName] = useState<string>('');
  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.GET
  );
  const [updating, setUpdating] = useState(false);

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
    if (!data) sendRequest();
    if (data && !company) getCompany();
    if (company) setCompanyName(company.data.name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, company]);

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
        `http://localhost:4000/api/v1/project/edit/${projectId}`,
        { payed, id: projectId },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}` } }
      );
      data.payed = res.data.data.payed;
      setUpdating(false);
    }
  }

  const ProjectDetailsChips = [
    { label: 'Hours', value: data?.totalHours ? data.totalHours : '0' },
    { label: 'Client', value: companyName },
    { label: 'Matter', value: data?.matter },
    { label: 'Category', value: data?.category },
    { label: 'Area', value: data?.area },
    { label: 'Periodicity', value: data?.periodicity },
    { label: 'Chargeable', value: data?.isChargeable ? 'Yes' : 'No' },
  ];

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
        <Link to='/projects' className='ml-auto text-darkGold no-underline'>
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
                {data && data.status !== undefined && <StatusChip status={data.status} />}
              </div>

              {ProjectDetailsChips.map((chip, i) => {
                return <InfoChip key={i} label={chip.label} value={String(chip.value ?? '')} />;
              })}

              {data?.isChargeable && (
                <div style={{ fontSize: '15px' }}>
                  <p style={{ marginLeft: '7px' }}>Payed</p>
                  <Chip
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
                  </Chip>
                </div>
              )}
            </div>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, mb: 3, mr: 1, gap: 18 }}>
            <div className='flex items-center'>
              <EventNoteIcon />
              <p className='ml-3'>Start Date: {data?.startDate && dateParser(data?.startDate)}</p>
            </div>

            <div className='flex items-center'>
              <EventNoteIcon />
              <p className='ml-3'>End Date: {data?.startDate && dateParser(data?.endDate)}</p>
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
        <TaskListTable projectId={id ? id : ''} />
      </Card>
    </>
  );
};

export default ProjectDetails;
