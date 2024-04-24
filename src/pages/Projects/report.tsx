import { useEffect } from "react";
import colors from "../../colors";
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import { Report } from "../../types/project-report";
import useHttp from "../../hooks/useHttp";
import { RequestMethods, APIPath } from "../../utils/constants";
import { useNavigate } from 'react-router-dom';
import StatusChip from "../../components/common/StatusChip"
import ColorChip from "../../components/common/ColorChip";
import left_arrow from '../../assets/icons/left_arrow.svg';
import calendar from '../../assets/icons/calendar.svg';
import download from '../../assets/icons/download.svg';
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ProjectReportPDF from "./report-pdf";

function dateParser (date: Date): string  {
  const arr = date.toString().split('-');
  const day = arr[2].substring(0, 2);
  const month = arr[1];
  const year = arr[0]; 
  return `${day}-${month}-${year}`;
}

const ProjectReport: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading, sendRequest, error } = useHttp<Report>(`${APIPath.PROJECT_REPORT}/${id}`, RequestMethods.GET);
    let totalTasks: number;
    const keyMap = new Map<string, string>([
      ['done', 'Done'],
      ['inprogress', 'In process'],
      ['underrevision', 'Under Revision'],
      ['delayed', 'Delayed'],
      ['postponed', 'Postponed'],
      ['notstarted', 'Not started'],
      ['cancelled', 'Cancelled']
    ]);

    const handleClick = () => {
      navigate('/projects');
    }

    useEffect (() => {
      if (!data){
        sendRequest();
      }
      
    }, [data]);

    if (loading) {
      return <div>Loading...</div>;
    }

    totalTasks = Number(data?.statistics?.total) || 1;

    if (error){
      return <div>Error al cargar el reporte-</div>
    }

    return (
      <main className='p-10 py-4'>
        {data? (
          <>
            <Box onClick={handleClick} sx= {{
              display: "flex",
              justifyContent: "flex-end",
            }}>
              <img src={left_arrow} alt='Left arrow' className='w-3.5' />
              <Link  underline="none" className="ml-auto" sx={{
                color: colors.darkGold, // Llamar el color correspondiente
                '&:hover': {
                  color: colors.darkerGold,
                },
              }}> &nbsp;{'Go Back'} </Link>
            </Box>

            <br/>

            <Box sx = {{
              display: "flex",
              gap: "15px",
            }}>
              <Box sx= {{
                width: "50%",
              }}>
                <Box sx = {{
                  display: "flex",
                  gap: "10px"
                }}>
                  <h1
                    style={{
                      color: "black",
                      fontSize: '2rem',
                      lineHeight: '1.1',
                      letterSpacing: '1.5px',
                    }}
                  >{data.project.name}
                  </h1>
                  <Box sx = {{
                    alignContent:"center"
                  }}>
                    <PDFDownloadLink document={<ProjectReportPDF data={data}/>} fileName={`report_${data.project.name}`}>
                      <img src={download} alt='Download' className='w-6' />
                    </PDFDownloadLink>
                  </Box>
                </Box>
                <p>{data.project.description}</p>
                
                <br/>

                <Box sx= {{
                  display: "flex",
                  gap: "40px"
                }}>
                  <StatusChip status = {`${data.project.status || '-'}`}/>
                  <ColorChip label = {`Total Hours: ${data.project.totalHours}`} color={`${colors.extra}`}></ColorChip>
                  <ColorChip label = {`${data.project.companyName}`} color={`${colors.null}`}></ColorChip>
                </Box>

                <br/>

                <Box sx= {{
                  display: "flex",
                  gap: "40px"
                }}>
                  {data.project.area && (
                    <Box>
                      <p style={{fontSize: '.9rem'}}>Area</p>
                      <ColorChip label = {data.project.area} color={`${colors.null}`}></ColorChip>
                    </Box>
                  )}
                  {data.project.matter && (
                    <Box>
                    <p style={{fontSize: '.9rem'}}>Matter</p>
                    <ColorChip label = {data.project.matter} color={`${colors.null}`}></ColorChip>
                  </Box>
                  )}
                  {data.project.category && (
                    <Box>
                      <p style={{fontSize: '.9rem'}}>Category</p>
                      <ColorChip label = {data.project.category || ""} color={`${colors.null}`}></ColorChip>
                    </Box>
                  )}

                  {data.project.isChargeable && (
                    <Box>
                        <p style={{fontSize: '.9rem'}}>Chargeable</p>
                        <ColorChip label = {`${data.project.isChargeable}`? 'Yes' : 'No'} color={`${colors.null}`}></ColorChip>
                      </Box> 
                  )}
                  
                </Box>
                <br/>

                <Box sx= {{
                  display: "flex",
                  gap: "100px"
                }}>
                  <Box>
                    <Box sx= {{
                      display: "flex",
                    }}>
                      <img src={calendar} alt='calendar' className='w-5' />
                      <p style={{fontSize: '1em'}}>&nbsp;Start Date</p>
                    </Box>
                    <p>{dateParser(data.project.startDate)}</p>
                  </Box>
                  {data.project.endDate &&
                    (
                    <Box>
                      <Box sx= {{
                        display: "flex",
                      }}>
                        <img src={calendar} alt='calendar' className='w-5' />
                        <p style={{fontSize: '1rem'}}>&nbsp;End Date</p>
                      </Box>
                      <p>{dateParser(data.project.endDate)}</p>
                    </Box>
                    )
                  }

                </Box>
              </Box>

              <Box bgcolor={colors.lighterGray} sx= {{
                width: "50%",
                borderRadius: "8px",
                
              }}>
                {data.statistics && (    
                  Object.entries(data.statistics).filter(([key, _]) => key !== 'total').map(([item, value]) => {
                    
                      return (
                        <>
                          <Grid key={item} container spacing={2} sx={{ flexGrow: 1 }} margin={1}>
                            <Grid xs={3}>
                              <p>{keyMap.get(item)}</p>
                            </Grid>

                            <Grid xs={8}>
                              <Box bgcolor={'#D5C7AD'} sx = {{
                                borderRadius: "10px",
                                width: "100%",
                                gridColumn: "1/3",
                                height: "15px",
                              }}>
                                <Box width = {`${(value * 100 / totalTasks).toString()}%`} bgcolor={colors.gold} sx = {{
                                  borderRadius: "10px",
                                  gridColumn: "1/3",
                                  height: "15px",
                                }}/>
                              </Box>
                            </Grid>

                            <Grid xs={1}>
                            <p>{Math.round(value * 100 / totalTasks)}%</p>
                            </Grid>
                          </Grid>
                        </>
                      )}))}
              </Box>
            </Box>

            <br/><br/><br/>

            <Box sx = {{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              {data.tasks?.map((item) => {
                return (
                <>
                  <Box key={item.title}>
                    <h3
                      style={{
                        color: "black",
                        fontSize: '1.5rem',
                        lineHeight: '1.1',
                        letterSpacing: '1.5px',
                      }}
                    >{item.title}
                    </h3>
                    <p>{item.description}</p>

                    <br/>

                    <Box sx = {{
                      display: "flex",
                      gap: "20px",
                    }}>
                      <StatusChip status = {`${item.status || '-'}`}/>  
                      <ColorChip label = {`Total Hours: ${item.workedHours}`} color={`${colors.extra}`}></ColorChip>
                      <ColorChip label = {`${item.waitingFor}`} color={`${colors.null}`}></ColorChip>
                    </Box>

                    <br/>

                    <Box sx = {{
                      display: "flex",
                      gap: "60px"
                    }}>
                      <Box sx = {{
                      display: "flex",
                    }}>
                        <img src={calendar} alt='calendar' className='w-5' />
                        <p style={{
                          color: "gray",
                          fontSize: '1rem',
                          letterSpacing: '1.5px',
                        }}>
                          &nbsp;Start Date:
                        </p>
                        <p>&nbsp;{dateParser(item.startDate)}</p>
                      </Box>

                      {item.endDate && (
                        <Box sx = {{
                          display: "flex"
                        }}>
                          <img src={calendar} alt='calendar' className='w-5' />
                          <p style={{
                            color: "gray",
                            fontSize: '1rem',
                            letterSpacing: '1.5px',
                          }}>
                            &nbsp;Due Date:
                          </p>
                          <p>&nbsp;{dateParser(item.endDate)}</p>
                        </Box>
                      )}
                      
                    </Box>

                    <br/>

                  </Box>
                  <Divider/>
                  <br />
                </>
              )})}
            </Box>
          </>
        ):  (
          <p>No se encontró el reporte</p>
        )}
        
        
      </main>
    );
  };
  
  export default ProjectReport;
  