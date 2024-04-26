import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box, Card } from '@mui/joy';
import { Chip } from '@mui/material';
import colors from '../../colors';

const ProjectDetails = () => {
  return (
    <>
      <Card className='bg-white flex-1 font-montserrat' sx={{ padding: '30px' }}>
        <section className='font-montserrat'>
          <section className='flex justify-between'>
            <h3 className='text-[22px] font-medium'>Alexander Volkmann VISA renovation</h3>
            <section className='flex justify-end gap-3'>
              <EditOutlinedIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                className='text-gold'
              />
              <ArchiveOutlinedIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                className='text-gold'
              />
              <DeleteOutlineOutlinedIcon
                sx={{ width: '25px', height: '25px', cursor: 'pointer' }}
                className='text-gold'
              />
            </section>
          </section>

          <p style={{ marginTop: '15px' }}>
            Visa renewal for Alexander Volkmann, including administrative procedures, necessary
            documentation, and legal advice to ensure his legal stay.
          </p>

          <div className='grid grid-cols-7 gap-4 pt-5 text-[10px]' style={{ color: colors.gray }}>
            <div>
              <p>Status</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Hours</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Client</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Matter</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Category</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Area</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>

            <div>
              <p>Chargeable</p>
              <Chip
                sx={{
                  bgcolor: colors.lightGray,
                  fontSize: '13px',
                }}
              />
            </div>
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'left', mt: 5, mb: -2.5, mr: 1, gap: 18 }}>
            <div className='flex items-center'>
              <EventNoteIcon sx={{ marginRight: '5px' }} />
              <p>Start Date: 14-02-2024</p>
            </div>

            <div className='flex items-center'>
              <EventNoteIcon sx={{ marginLeft: '5px' }} />
              <p>End Date: 28-03-2024</p>
            </div>
          </Box>
        </section>
      </Card>
    </>
  );
};

export default ProjectDetails;
