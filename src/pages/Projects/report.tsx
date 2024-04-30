import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Link from '@mui/joy/Link';
import { DatePicker } from '@mui/x-date-pickers';
import { PDFDownloadLink } from '@react-pdf/renderer';
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

  //let date: string = '';
  // const [year, setYear] = useState<string | null>(null);
  // const [month, setMonth] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>();
  const [report, setReport] = useState<Report>();

  const reqReport = useHttp<Report>(`${APIPath.PROJECT_REPORT}/${id}`, RequestMethods.GET);
  const reqFilteredReport = useHttp<Report>(
    `${APIPath.PROJECT_REPORT}/${id}?date=${date}`,
    RequestMethods.GET
  );

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

  const handleClose = () => {
    console.log(date);
    console.log(`${APIPath.PROJECT_REPORT}/${id}?date=${date}`);
    reqFilteredReport.sendRequest();
  };

  useEffect(() => {
    if (reqFilteredReport.data) {
      setReport(reqFilteredReport.data);
    } else if (!reqReport.data) {
      reqReport.sendRequest();
    } else {
      setReport(reqReport.data);
    }
  }, [reqReport.data, reqFilteredReport.data]);

  if (reqReport.loading) {
    return <div>Loading...</div>;
  }

  const totalTasks = report?.statistics?.total || 1;

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
        {report ? (
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
                      {report.project.name}
                    </h1>

                    <Box>
                      <PDFDownloadLink
                        document={<ProjectReportPDF data={report} />}
                        fileName={`report_${report.project.name}`}
                      >
                        <img src={download} alt='Download' className='w-6' />
                      </PDFDownloadLink>
                    </Box>
                  </Box>
                  <DatePicker
                    label='Select a month and a year'
                    views={['year', 'month']}
                    slotProps={{ textField: { size: 'small' } }}
                    onChange={filterDate => setDate(filterDate?.toDate())}
                    onClose={handleClose}
                  />
                </Box>

                <br />
                <p>{report.project.description}</p>

                <br />

                <Box
                  sx={{
                    display: 'flex',
                    gap: '40px',
                  }}
                >
                  <StatusChip status={`${report.project.status || '-'}`} />
                  <ColorChip
                    label={`Total Hours: ${report.project.totalHours}`}
                    color={`${colors.extra}`}
                  ></ColorChip>
                  <ColorChip
                    label={`${report.project.companyName}`}
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
                      label={report.project.matter || ''}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Category</p>
                    <ColorChip
                      label={report.project.category || ''}
                      color={`${colors.null}`}
                    ></ColorChip>
                  </Box>
                  <Box>
                    <p style={{ fontSize: '.9rem' }}>Chargeable</p>
                    <ColorChip
                      label={`${report.project.isChargeable}` ? 'Yes' : 'No'}
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
                    <p>{dateParser(report.project.startDate)}</p>
                  </Box>

                  {report.project.endDate && (
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <img src={calendar} alt='calendar' className='w-5' />
                        <p style={{ fontSize: '1rem' }}>&nbsp;End Date</p>
                      </Box>
                      <p>{dateParser(report.project.endDate)}</p>
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
                {report.statistics &&
                  Object.entries(report.statistics)
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
              {report.tasks?.map(item => {
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
