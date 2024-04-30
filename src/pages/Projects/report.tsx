import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import { DatePicker } from '@mui/x-date-pickers';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import calendar from '../../assets/icons/calendar.svg';
import download from '../../assets/icons/download.svg';
import left_arrow from '../../assets/icons/left_arrow.svg';
import colors from '../../colors';
import ColorChip from '../../components/common/ColorChip';
import StatusChip from '../../components/common/StatusChip';
import useHttp from '../../hooks/useHttp';
import { Report } from '../../types/project-report';
import { APIPath, RequestMethods } from '../../utils/constants';
import ProjectReportPDF from './report-pdf';

function dateParser(date: Date): string {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0];
  return `${day}-${month}-${year}`;
}

const ProjectReport: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;

  const [request, setRequest] = useState<string>(`${APIPath.PROJECT_REPORT}/${id}`);
  const reqReport = useHttp<Report>(request, RequestMethods.GET);
  const [date, setDate] = useState<string | null>(null);

  const keyMap = new Map<string, string>([
    ['done', 'Done'],
    ['inprogress', 'In process'],
    ['underrevision', 'Under Revision'],
    ['delayed', 'Delayed'],
    ['postponed', 'Postponed'],
    ['notstarted', 'Not started'],
    ['cancelled', 'Cancelled'],
  ]);

  const handleClick = () => {
    navigate('/projects');
  };

  const handleChange = (filterDate: Dayjs | null) => {
    if (filterDate === null) return;
    setDate(new Date(filterDate.year(), filterDate.month(), filterDate.day()).toISOString());
  };

  const handleClose = () => {
    if (date === null) return;
    console.log(`${BASE_URL}${APIPath.PROJECT_REPORT}/${id}?date=${date}`);
    setRequest(`${BASE_URL}${APIPath.PROJECT_REPORT}/${id}?date=${date}`);

    const doFetch = async (): Promise<void> => {
      await axios.get(`${BASE_URL}${APIPath.PROJECT_REPORT}/${id}?date=${date}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}` },
      });
      reqReport.sendRequest();
    };
    void doFetch();
  };

  useEffect(() => {
    console.log('RENDERIZANDING...');
    if (!reqReport.data) {
      reqReport.sendRequest();
    }
  }, [reqReport.data]);

  if (reqReport.loading) {
    return <div>Loading...</div>;
  }

  const totalTasks = reqReport.data?.statistics?.total || 1;

  if (reqReport.error) {
    return <div>Error laoding the report</div>;
  }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <img src={left_arrow} alt='Left arrow' className='w-3.5' />
        <Link
          underline='none'
          className='ml-auto'
          sx={{
            color: colors.darkGold,
            '&:hover': {
              color: colors.darkerGold,
            },
          }}
        >
          {' '}
          &nbsp;{'Go Back'}{' '}
        </Link>
      </Box>

      <br />
      <main className='p-10 py-4 h-[calc(100vh-190px)] overflow-scroll overflow-x-hidden'>
        {reqReport.data ? (
          <>
            <Box
              sx={{
                display: 'flex',
                gap: '30px',
              }}
            >
              <Box
                sx={{
                  width: '50%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <h1
                      style={{
                        color: 'black',
                        fontSize: '1.7rem',
                        lineHeight: '1.1',
                        letterSpacing: '1.5px',
                      }}
                    >
                      {reqReport.data.project.name}
                    </h1>

                    <Box>
                      <PDFDownloadLink
                        document={<ProjectReportPDF data={reqReport.data} />}
                        fileName={`report_${reqReport.data.project.name}`}
                      >
                        <img src={download} alt='Download' className='w-6' />
                      </PDFDownloadLink>
                    </Box>
                  </Box>
                  <DatePicker
                    label='Selecciona un mes y año'
                    views={['year', 'month']}
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={filterDate => handleChange(filterDate)}
                    onClose={handleClose}
                  />
                </Box>

                <br />
                <p>{reqReport.data.project.description}</p>

                <br />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '40px',
                  }}
                >
                  <StatusChip status={`${reqReport.data.project.status || '-'}`} />
                  <ColorChip
                    label={`Total Hours: ${reqReport.data.project.totalHours}`}
                    color={`${colors.extra}`}
                  ></ColorChip>
                  <ColorChip
                    label={`${reqReport.data.project.companyName}`}
                    color={`${colors.null}`}
                  ></ColorChip>
                </Box>

                <br />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '40px',
                  }}
                >
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Matter</p>
                    <ColorChip
                      label={reqReport.data.project.matter || ''}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Category</p>
                    <ColorChip
                      label={reqReport.data.project.category || ''}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Chargeable</p>
                    <ColorChip
                      label={`${reqReport.data.project.isChargeable}` ? 'Yes' : 'No'}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                </Box>

                <br />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '100px',
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <img src={calendar} alt='calendar' className='w-5' />
                      <p style={{ fontSize: '1em' }}>&nbsp;Start Date</p>
                    </Box>
                    <p>{dateParser(reqReport.data.project.startDate)}</p>
                  </Box>

                  {reqReport.data.project.endDate && (
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <img src={calendar} alt='calendar' className='w-5' />
                        <p style={{ fontSize: '1rem' }}>&nbsp;End Date</p>
                      </Box>
                      <p>{dateParser(reqReport.data.project.endDate)}</p>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box
                bgcolor={colors.lighterGray}
                sx={{
                  width: '50%',
                  borderRadius: '8px',
                }}
              >
                {reqReport.data.statistics &&
                  Object.entries(reqReport.data.statistics)
                    .filter(([key]) => key !== 'total')
                    .map(([item, value]) => {
                      return (
                        <>
                          <Grid container spacing={2} sx={{ flexGrow: 1 }} margin={1}>
                            <Grid xs={3}>
                              <p>{keyMap.get(item)}</p>
                            </Grid>

                            <Grid xs={8}>
                              <Box
                                bgcolor={'#D5C7AD'}
                                sx={{
                                  borderRadius: '10px',
                                  width: '100%',
                                  gridColumn: '1/3',
                                  height: '15px',
                                }}
                              >
                                <Box
                                  width={`${((value * 100) / totalTasks).toString()}%`}
                                  bgcolor={colors.gold}
                                  sx={{
                                    borderRadius: '10px',
                                    gridColumn: '1/3',
                                    height: '15px',
                                  }}
                                />
                              </Box>
                            </Grid>

                            <Grid xs={1}>
                              <p>{Math.round((value * 100) / totalTasks)}%</p>
                            </Grid>
                          </Grid>
                        </>
                      );
                    })}
              </Box>
            </Box>

            <br />
            <br />
            <br />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {reqReport.data.tasks?.map(item => {
                return (
                  <>
                    <Box key={item.title}>
                      <h3
                        style={{
                          color: 'black',
                          fontSize: '1.5rem',
                          lineHeight: '1.1',
                          letterSpacing: '1.5px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p>{item.description}</p>

                      <br />

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '20px',
                        }}
                      >
                        <Box>
                          <p style={{ fontSize: '.9rem' }}>Status</p>
                          <StatusChip status={`${item.status || '-'}`} />
                        </Box>

                        {item.workedHours && (
                          <Box>
                            <p style={{ fontSize: '.9rem' }}>Worked Hours</p>
                            <ColorChip
                              label={`Total Hours: ${item.workedHours}`}
                              color={`${colors.extra}`}
                            ></ColorChip>
                          </Box>
                        )}

                        {item.employeeFirstName && item.employeeLastName && (
                          <Box>
                            <p style={{ fontSize: '.9rem' }}>Responsible</p>
                            <ColorChip
                              label={`${item.employeeFirstName} ${item.employeeLastName}`}
                              color={`${colors.null}`}
                            ></ColorChip>
                          </Box>
                        )}

                        {item.waitingFor && (
                          <Box>
                            <p style={{ fontSize: '.9rem' }}>Waiting For</p>
                            <ColorChip label={item.waitingFor} color={`${colors.null}`}></ColorChip>
                          </Box>
                        )}
                      </Box>

                      <br />

                      <Box
                        sx={{
                          display: 'flex',
                          gap: '60px',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                          }}
                        >
                          <img src={calendar} alt='calendar' className='w-5' />
                          <p
                            style={{
                              color: 'gray',
                              fontSize: '1rem',
                              letterSpacing: '1.5px',
                            }}
                          >
                            &nbsp;Start Date:
                          </p>
                          <p>&nbsp;{dateParser(item.startDate)}</p>
                        </Box>

                        {item.endDate && (
                          <Box
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <img src={calendar} alt='calendar' className='w-5' />
                            <p
                              style={{
                                color: 'gray',
                                fontSize: '1rem',
                                letterSpacing: '1.5px',
                              }}
                            >
                              &nbsp;Due Date:
                            </p>
                            <p>&nbsp;{dateParser(item.endDate)}</p>
                          </Box>
                        )}
                      </Box>

                      <br />
                    </Box>
                    <Divider />
                    <br />
                  </>
                );
              })}
            </Box>
          </>
        ) : (
          <p>No data available</p>
        )}
      </main>
    </>
  );
};

export default ProjectReport;
