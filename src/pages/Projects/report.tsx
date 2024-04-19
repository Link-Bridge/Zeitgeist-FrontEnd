import { useEffect } from "react";
import colors from "../../colors";
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
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

    const handleClick = () => {
      navigate('/projects');
    }

    useEffect (() => {
      if (!data){
        sendRequest()
      }
      
    }, [data]);

    if (loading) {
      return <div>Loading...</div>;
    }

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
              gap: "80px",
            }}>
              <Box sx= {{
                width: "50%"
              }}>
                <Box sx = {{
                  display: "flex",
                  gap: "10px"
                }}>
                  <h1
                    style={{
                      color: "black",
                      fontSize: '1.5rem',
                      lineHeight: '1.1',
                      letterSpacing: '1.5px',
                    }}
                  >{data.project.name}
                  </h1>
                  <img src={download} alt='Download' className='w-6' />
                </Box>
                <p>{data.project.description}</p>
                
                <br/>

                <Box sx= {{
                  display: "flex",
                  gap: "40px"
                }}>
                  <StatusChip status = {`${data.project.status || '-'}`}/>
                  <ColorChip label = {`TOTAL HOURS: ${data.project.totalHours}`} color={`${colors.extra}`}></ColorChip>
                  <ColorChip label = {`${data.project.companyName}`} color={`${colors.null}`}></ColorChip>
                </Box>

                <br/>

                <Box sx= {{
                  display: "flex",
                  gap: "40px"
                }}>
                  <Box>
                    <p style={{fontSize: '.9rem'}}>Matter</p>
                    <ColorChip label = {data.project.matter || ""} color={`${colors.null}`}></ColorChip>
                  </Box>
                  <Box>
                    <p style={{fontSize: '.9rem'}}>Category</p>
                    <ColorChip label = {data.project.category || ""} color={`${colors.null}`}></ColorChip>
                  </Box>
                  <Box>
                    <p style={{fontSize: '.9rem'}}>Chargeable</p>
                    <ColorChip label = {`${data.project.isChargeable}`? 'YES' : 'NO'} color={`${colors.null}`}></ColorChip>
                  </Box> 
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
                      <img src={calendar} alt='calendar' className='w-3.5' />
                      <p style={{fontSize: '.9rem'}}>&nbsp;Start Date</p>
                    </Box>
                    <p>{dateParser(data.project.startDate)}</p>
                  </Box>
                  {data.project.endDate &&
                    (
                    <Box>
                      <Box sx= {{
                        display: "flex",
                      }}>
                        <img src={calendar} alt='calendar' className='w-3.5' />
                        <p style={{fontSize: '.9rem'}}>&nbsp;End Date</p>
                      </Box>
                      <p>{dateParser(data.project.endDate)}</p>
                    </Box>
                    )
                  }

                </Box>


              </Box>
              <Box sx= {{
                width: "50%",
                borderRadius: "8px",
                bgcolor: "primary.239",
              }}>
              STATISTICS
              </Box>
            </Box>

            <br/><br/>

            <Box sx = {{
              display: "flex",
              gap: "10px",
              bgcolor: "primary.300",
            }}>
              TASKS
            </Box>
          </>
        ):  (
          <p>No se encontró el reporte</p>
        )}
        
        
      </main>
    );
  };
  
  export default ProjectReport;
  

  /*
  <h2>{data.project.name}</h2>
            <p>{data.project.description}</p>
            <div className='p-10 py-4 flex'>
              <StatusChip status = {`${data.project.status || '-'}`}/>
              <ColorChip label = {`${data.project.totalHours}`} color={`${colors.extra}`}></ColorChip>
              <ColorChip label = {`${data.project.totalHours}`} color={`${colors.null}`}></ColorChip>
            </div>
    
            <div className='p-10 py-4 flex'>
              <div>
                <p>Matter</p>
                <ColorChip label = {data.project.matter || ""} color={`${colors.null}`}></ColorChip>
              </div>
    
              <div>
                <p>Category</p>
                <ColorChip label = {data.project.category || "" } color={`${colors.null}`}></ColorChip>
              </div>
    
              <div>
                <p>Chargeable</p>
                <ColorChip label = {`${data.project.isChargeable}`? 'YES' : 'NO'} color={`${colors.null}`}></ColorChip>
              </div>
    
            </div>
    
            <div className='p-10 py-4 flex'>
            <div>
                {
                  data.project.startDate &&
                  <>
                    <p>Start Date</p>
                    <p>{data.project.startDate.toString() || ''}</p>
                  </>
                }
              </div>

              <div>
                {
                  data.project.endDate &&
                  <>
                    <p>End Date</p>
                    <p>{data.project.endDate.toString() || ''}</p>
                  </>
                }
              </div>

            </div>


  */