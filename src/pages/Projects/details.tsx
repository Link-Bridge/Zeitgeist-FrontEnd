import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, Card } from '@mui/joy';
import { Chip } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import colors from '../../colors';
import StatusChip from '../../components/common/StatusChip';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { APIPath, RequestMethods } from '../../utils/constants';

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
  minWidth: '100px',
  textAlign: 'left',
};

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, loading, sendRequest, error } = useHttp<ProjectEntity>(
    `${APIPath.PROJECT_DETAILS}/${id}`,
    RequestMethods.GET
  );

  useEffect(() => {
    if (!data) {
      sendRequest();
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading task</div>;
  }

  return (
    <>
      <Card className='bg-white' sx={{ Maxwidth: '300px', padding: '20px', marginTop: '20px' }}>
        <section className='font-montserrat'>
          <section className='flex justify-between'>
            <h3 className='text-[22px] font-medium' style={{ marginTop: '15px' }}>
              {data?.name}
            </h3>
            <section className='flex justify-end gap-3'>
              <EditOutlinedIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                className='text-gold'
              />
            </section>
          </section>

          <p style={{ marginTop: '15px' }}>{data?.description}</p>

          <div className='grid grid-cols-7 gap-4 pt-5 text-[10px]' style={{ color: colors.gray }}>
            <div>
              <p>{data?.status}</p>
              {data && data.status !== undefined && <StatusChip status={data.status} />}
            </div>

            <div>
              <p>Hours</p>
              <Chip
                sx={{
                  bgcolor: colors.extra,
                  fontSize: '1rem',
                  minWidth: '100px',
                }}
                label={data?.totalHours}
              />
            </div>

            <div>
              <p>Client</p>
              <Chip sx={chipStyle} />
            </div>

            <div>
              <p>Matter</p>
              <Chip sx={chipStyle} label={data?.matter} />
            </div>

            <div>
              <p>Category</p>
              <Chip sx={chipStyle} label={data?.category} />
            </div>

            <div>
              <p>Area</p>
              <Chip sx={chipStyle} label={data?.area} />
            </div>

            <div>
              <p>Chargeable</p>
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
    </>
  );
};

export default ProjectDetails;
